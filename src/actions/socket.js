import io from 'socket.io-client'

import {
  SUBSCRIBE,
  NEW_WARNING,
  NEW_ERROR,
  NEW_FATAL_ERROR,
  RESET,
  UPDATE_DILEMMA,
  UPDATE_STATS,
  NEW_MESSAGE,
  RECAPTCHA_SITE_KEY,
  SENT_EMAIL,
  PAYMENT
} from '../constants'

const socket = io(process.env.REACT_APP_WEBSOCKET_URL)

export const subscribe = () => {
  return (dispatch) => {
    socket.on('dilemma', (dilemma) => {
      dispatch({ type: UPDATE_DILEMMA, dilemma })
    })

    socket.on('api_warning', ({ message }) => {
      dispatch({ type: NEW_WARNING, message })
    })

    socket.on('api_error', ({ message }) => {
      dispatch({ type: NEW_ERROR, message })
    })

    socket.on('disconnect', () => {
      dispatch({ type: NEW_FATAL_ERROR, message: 'Disconnected from server' })
      socket.disconnect()
    })

    socket.on('fatal_api_error', ({ message }) => {
      dispatch({ type: NEW_FATAL_ERROR, message })
      socket.disconnect()
    })

    socket.on('message', (content) => {
      dispatch({ type: NEW_MESSAGE, message: { from: 'Them', content } })
    })

    socket.on('payment', (success) => {
      dispatch({ type: PAYMENT, success })
    })

    socket.on('stats', (stats) => {
      dispatch({ type: UPDATE_STATS, stats })
    })

    dispatch({ type: SUBSCRIBE, unsubscribe: () => { socket.close() } })
  }
}

export const newGame = () => {
  return (dispatch) => {
    dispatch({ type: RESET })
    window.grecaptcha.ready(async () => {
      const token = await window.grecaptcha.execute(RECAPTCHA_SITE_KEY, { action: 'reset' })
      socket.emit('reset', token)
    })
  }
}

export const sendChoice = (choice) => {
  return () => {
    socket.emit('choice', choice)
  }
}

export const sendMessage = (message) => {
  return (dispatch) => {
    const content = message.trim()
    if (message) {
      dispatch({ type: NEW_MESSAGE, message: { from: 'You', content } })
      socket.emit('message', message)
    }
  }
}

export const sendEmail = (_email) => {
  return (dispatch) => {
    const email = _email.trim()
    if (email) {
      socket.emit('email', email)
      dispatch({ type: SENT_EMAIL })
    }
  }
}

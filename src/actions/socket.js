import io from 'socket.io-client'

import { SUBSCRIBE, NEW_DILEMMA, UPDATE_DILEMMA, NEW_MESSAGE } from '../constants'

const socket = io('http://localhost:3001')

export const subscribe = () => {
  return (dispatch) => {
    socket.on('dilemma', (dilemma) => {
      dispatch({ type: UPDATE_DILEMMA, dilemma })
    })

    socket.on('message', (content) => {
      dispatch({ type: NEW_MESSAGE, message: { from: 'Them', content } })
    })

    dispatch({ type: SUBSCRIBE, unsubscribe: () => { socket.close() } })
  }
}

export const newGame = () => {
  return (dispatch) => {
    socket.emit('reset')
    dispatch({ type: NEW_DILEMMA })
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

import io from 'socket.io-client'

import { SUBSCRIBE, UPDATE_DILEMMA } from '../constants'

const socket = io('http://localhost:3001')

export const subscribe = () => {
  return (dispatch) => {
    socket.on('dilemma', (dilemma) => {
      dispatch({ type: UPDATE_DILEMMA, dilemma })
    })
    dispatch({ type: SUBSCRIBE, unsubscribe: () => { socket.close() } })
  }
}

export const sendChoice = (choice) => {
  return () => {
    socket.emit('choice', choice)
  }
}

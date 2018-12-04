import { combineReducers } from 'redux'
import dilemma from './dilemma'
import socket from './socket'

const app = combineReducers({
  dilemma,
  socket
})

export default app

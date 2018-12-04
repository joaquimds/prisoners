import { combineReducers } from 'redux'
import socket from './socket'
import dilemma from './dilemma'
import chat from './chat'

const app = combineReducers({
  socket,
  dilemma,
  chat
})

export default app

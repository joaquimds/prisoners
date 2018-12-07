import { combineReducers } from 'redux'
import socket from './socket'
import error from './error'
import dilemma from './dilemma'
import email from './email'
import chat from './chat'

const app = combineReducers({
  socket,
  error,
  dilemma,
  email,
  chat
})

export default app

import { combineReducers } from 'redux'
import socket from './socket'
import game from './game'
import dilemma from './dilemma'
import payment from './payment'
import chat from './chat'

const app = combineReducers({
  socket,
  game,
  dilemma,
  payment,
  chat
})

export default app

import { combineReducers } from 'redux'
import main from './main'
import socket from './socket'
import game from './game'
import stats from './stats'
import dilemma from './dilemma'
import payment from './payment'
import chat from './chat'

const app = combineReducers({
  socket,
  main,
  game,
  stats,
  dilemma,
  payment,
  chat
})

export default app

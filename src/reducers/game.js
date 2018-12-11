import { NEW_WARNING, NEW_ERROR, NEW_FATAL_ERROR, RESET, UPDATE_DILEMMA } from '../constants'

const game = (state = {}, action) => {
  switch (action.type) {
    case RESET:
      return { waiting: true }
    case UPDATE_DILEMMA:
      return { waiting: false }
    case NEW_WARNING:
      return { ...state, error: { message: action.message, fatal: false } }
    case NEW_ERROR:
      return { waiting: false, error: { message: action.message, fatal: false } }
    case NEW_FATAL_ERROR:
      return { waiting: false, error: { message: action.message, fatal: true } }
    default:
      return state
  }
}

export default game

import { NEW_ERROR, RESET, UPDATE_DILEMMA } from '../constants'

const game = (state = {}, action) => {
  switch (action.type) {
    case RESET:
      return { waiting: true }
    case UPDATE_DILEMMA:
      return { waiting: false }
    case NEW_ERROR: {
      return { ...state, error: { message: action.message, fatal: action.fatal } }
    }
    default:
      return state
  }
}

export default game

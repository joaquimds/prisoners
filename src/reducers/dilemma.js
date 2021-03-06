import { RESET, UPDATE_DILEMMA } from '../constants'

const dilemma = (state = null, action) => {
  switch (action.type) {
    case RESET:
      return null
    case UPDATE_DILEMMA:
      return action.dilemma
    default:
      return state
  }
}

export default dilemma

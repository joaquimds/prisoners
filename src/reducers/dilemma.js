import { NEW_DILEMMA, UPDATE_DILEMMA } from '../constants'

const dilemma = (state = {}, action) => {
  switch (action.type) {
    case NEW_DILEMMA:
      return { waiting: true }
    case UPDATE_DILEMMA:
      return { current: action.dilemma, waiting: false }
    default:
      return state
  }
}

export default dilemma

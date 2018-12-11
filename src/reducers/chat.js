import { NEW_MESSAGE, CHANGE_MESSAGE, RESET, UPDATE_DILEMMA } from '../constants'

const chat = (state = { messages: [], message: '' }, action) => {
  switch (action.type) {
    case NEW_MESSAGE:
      return { ...state, messages: state.messages.concat([ action.message ]), message: '' }
    case CHANGE_MESSAGE:
      return { ...state, message: action.message }
    case UPDATE_DILEMMA:
      if (action.dilemma.players < 2) {
        return { messages: [], message: '' }
      }
      return state
    case RESET:
      return { messages: [], message: '' }
    default:
      return state
  }
}

export default chat

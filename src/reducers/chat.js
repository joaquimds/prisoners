import { NEW_MESSAGE, CHANGE_MESSAGE, RESET } from '../constants'

const chat = (state = { messages: [], message: '' }, action) => {
  switch (action.type) {
    case NEW_MESSAGE:
      return { ...state, messages: state.messages.concat([ action.message ]), message: '' }
    case CHANGE_MESSAGE:
      return { ...state, message: action.message }
    case RESET:
      return { messages: [], message: '' }
    default:
      return state
  }
}

export default chat

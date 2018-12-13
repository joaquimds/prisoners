import { CONNECTED, SUBSCRIBE } from '../constants'

const socket = (state = {}, action) => {
  switch (action.type) {
    case CONNECTED:
      return { ...state, connected: true }
    case SUBSCRIBE:
      return { ...state, unsubscribe: action.unsubscribe }
    default:
      return state
  }
}

export default socket

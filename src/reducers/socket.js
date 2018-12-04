import { SUBSCRIBE } from '../constants'

const socket = (state = {}, action) => {
  switch (action.type) {
    case SUBSCRIBE:
      return { unsubscribe: action.unsubscribe }
    default:
      return state
  }
}

export default socket

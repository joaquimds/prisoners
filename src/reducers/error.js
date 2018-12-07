import { NEW_ERROR } from '../constants'

const error = (state = null, action) => {
  switch (action.type) {
    case NEW_ERROR:
      return action.message
    default:
      return state
  }
}

export default error

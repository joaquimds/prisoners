import { CHANGE_EMAIL } from '../constants'

const email = (state = '', action) => {
  switch (action.type) {
    case CHANGE_EMAIL:
      return action.email
    default:
      return state
  }
}

export default email

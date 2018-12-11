import { RESET, CHANGE_EMAIL, PAYMENT, SENT_EMAIL } from '../constants'

const payment = (state = { email: '' }, action) => {
  switch (action.type) {
    case CHANGE_EMAIL:
      return { email: action.email }
    case SENT_EMAIL:
      return { email: state.email, waiting: true }
    case PAYMENT:
      return { email: state.email, waiting: false, success: action.success }
    case RESET:
      return { email: state.email }
    default:
      return state
  }
}

export default payment

import { NEW_DILEMMA, UPDATE_DILEMMA, SENT_EMAIL, PAYMENT } from '../constants'

const dilemma = (state = {}, action) => {
  switch (action.type) {
    case NEW_DILEMMA:
      return { waiting: true }
    case UPDATE_DILEMMA:
      return { ...state, current: action.dilemma, waiting: false }
    case SENT_EMAIL:
      return { ...state, waitingForPayment: true }
    case PAYMENT:
      return { ...state, waitingForPayment: false, paymentSuccess: action.success }
    default:
      return state
  }
}

export default dilemma

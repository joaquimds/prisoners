import { CHANGE_MESSAGE } from '../constants'

export const changeMessage = (message) => ({ type: CHANGE_MESSAGE, message: message.substring(0, 140) })

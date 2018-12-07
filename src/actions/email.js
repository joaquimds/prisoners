import { CHANGE_EMAIL } from '../constants'

export const changeEmail = (email) => {
  return { type: CHANGE_EMAIL, email }
}

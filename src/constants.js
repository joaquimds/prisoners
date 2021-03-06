/** Actions */
export const SUBSCRIBE = 'SUBSCRIBE'
export const CONNECTED = 'CONNECTED'

export const NEW_WARNING = 'NEW_WARNING'
export const NEW_ERROR = 'NEW_ERROR'
export const NEW_FATAL_ERROR = 'NEW_FATAL_ERROR'

export const RESET = 'RESET'

export const UPDATE_PLAYER_COUNT = 'UPDATE_PLAYER_COUNT'

export const UPDATE_DILEMMA = 'UPDATE_DILEMMA'

export const UPDATE_STATS = 'UPDATE_STATS'

export const SEND_MESSAGE = 'SEND_MESSAGE'
export const NEW_MESSAGE = 'NEW_MESSAGE'
export const CHANGE_MESSAGE = 'CHANGE_MESSAGE'

export const CHANGE_EMAIL = 'CHANGE_EMAIL'
export const SENT_EMAIL = 'SENT_EMAIL'
export const PAYMENT = 'PAYMENT'

/** Env */
export const RECAPTCHA_SITE_KEY = process.env.REACT_APP_RECAPTCHA_SITE_KEY

/** Misc */
export const CHOICES = ['Split', 'Steal']
export const OUTCOMES = {
  PENDING: 'Pending',
  SPLIT: 'Split',
  STEAL: 'Steal',
  LOSE: 'Lose'
}

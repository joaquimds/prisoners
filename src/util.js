import { OUTCOMES } from './constants'

export const isDilemmaWaiting = (dilemma) => {
  return !dilemma.readyTimestamp || Date.now() < dilemma.readyTimestamp
}

export const isDilemmaComplete = (dilemma) => {
  if (dilemma.endTimestamp && Date.now() > dilemma.endTimestamp) {
    return true
  }
  return dilemma.outcome !== OUTCOMES.PENDING
}

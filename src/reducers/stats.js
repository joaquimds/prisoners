import { UPDATE_STATS } from '../constants'

const dilemma = (state = null, action) => {
  switch (action.type) {
    case UPDATE_STATS:
      return action.stats
    default:
      return state
  }
}

export default dilemma

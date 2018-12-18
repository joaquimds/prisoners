import { UPDATE_PLAYER_COUNT } from '../constants'

const dilemma = (state = { playerCount: 0 }, action) => {
  switch (action.type) {
    case UPDATE_PLAYER_COUNT:
      return { playerCount: action.playerCount }
    default:
      return state
  }
}

export default dilemma

import './dilemma.scss'

import React, { Component } from 'react'
import { connect } from 'react-redux'

import { CHOICES, OUTCOMES } from '../../constants'
import { sendChoice } from '../../actions/socket'

class Dilemma extends Component {
  componentDidUpdate () {
    const { dilemma } = this.props
    if (dilemma && dilemma.readyTimestamp && dilemma.readyTimestamp > Date.now()) {
      setTimeout(() => this.setState({}), 1000)
    }
  }

  getMessage () {
    const { dilemma } = this.props

    switch (dilemma.outcome) {
      case OUTCOMES.LOSE:
        return 'You both tried to steal. You lose!'
      case OUTCOMES.STEAL:
        return dilemma.hasWon ? 'You won with a steal!' : 'You lost to a steal!'
      case OUTCOMES.SPLIT:
        return 'You won with a split!'
      default:
        if (dilemma.players < 2) {
          return 'Waiting for a partner...'
        }
        if (dilemma.hasChosen) {
          return 'Waiting for your partner...'
        }
        const now = Date.now()
        if (dilemma.readyTimestamp && dilemma.readyTimestamp > now) {
          return `You may choose in ${Math.ceil((dilemma.readyTimestamp - now) / 1000)}`
        }
        return 'Make your choice!'
    }
  }

  getButtons () {
    const { dilemma, makeChoice } = this.props
    const inPlay = dilemma.outcome === OUTCOMES.PENDING

    if (!inPlay) {
      return null
    }

    const disabled = !dilemma.readyTimestamp || Date.now() < dilemma.readyTimestamp
    return (
      <div className='dilemma__choices'>
        {
          CHOICES.map(choice => (
            <button className='dilemma__choice' key={choice} onClick={() => makeChoice(choice)} disabled={disabled}>
              {choice}
            </button>
          ))
        }
      </div>
    )
  }

  render () {
    if (!this.props.dilemma) {
      return null
    }
    const message = this.getMessage()
    const buttons = this.getButtons()
    return (
      <div className='dilemma'>
        <p className='dilemma__status'>{message}</p>
        {buttons}
      </div>
    )
  }
}

const mapStateToProps = ({ dilemma }) => ({ dilemma })
const mapDispatchToProps = (dispatch) => {
  return {
    makeChoice: (choice) => {
      dispatch(sendChoice(choice))
    }
  }
}
const DilemmaContainer = connect(mapStateToProps, mapDispatchToProps)(Dilemma)

export default DilemmaContainer

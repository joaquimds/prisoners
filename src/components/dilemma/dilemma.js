import './dilemma.scss'

import React, { Component } from 'react'
import { connect } from 'react-redux'

import { CHOICES, OUTCOMES } from '../../constants'
import { newGame, sendChoice } from '../../actions/socket'

class Dilemma extends Component {
  componentDidUpdate () {
    const { dilemma } = this.props
    if (dilemma && dilemma.readyTimestamp && dilemma.readyTimestamp > Date.now()) {
      setTimeout(() => this.setState({}), 1000)
    }
  }

  getMessage () {
    const { dilemma, waiting } = this.props

    if (dilemma) {
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
            return 'Waiting...'
          }
          const now = Date.now()
          if (dilemma.readyTimestamp && dilemma.readyTimestamp > now) {
            return `You may choose in ${Math.ceil((dilemma.readyTimestamp - now) / 1000)}`
          }
          return 'Make your choice!'
      }
    }

    if (waiting) {
      return 'Waiting for a game...'
    }

    return 'Play now!'
  }

  getButtons () {
    const { dilemma, waiting, makeChoice, newGame } = this.props
    const inPlay = dilemma && dilemma.outcome === OUTCOMES.PENDING

    if (waiting) {
      return []
    }

    if (inPlay) {
      const disabled = !dilemma.readyTimestamp || Date.now() < dilemma.readyTimestamp
      return CHOICES.map(choice => (
        <button className='dilemma__choice' key={choice} onClick={() => makeChoice(choice)} disabled={disabled}>
          {choice}
        </button>
      ))
    }

    return [
      <button className='dilemma__choice' key='new' onClick={() => newGame()}>New Game</button>
    ]
  }

  render () {
    const message = this.getMessage()
    const buttons = this.getButtons()
    return (
      <div className='dilemma'>
        <h2>Dilemma</h2>
        <div className='dilemma__intro'>
          <p>
            Play Prisoner's Dilemma online, for real money!
          </p>
          <p>
            Each game has a top prize of &pound;1. Each game has two players. If both players split, they receive
            50p each. If one player splits and one steals, the player who stole receives £1 and the other receives
            nothing.
            If both players steal, they both receive nothing.
          </p>
          <p>When the game is over, enter your PayPal email address to receive your winnings.</p>
        </div>
        <div className='dilemma__main'>
          <p className='dilemma__status'>{message}</p>
          <div className='dilemma__choices'>
            {buttons}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ dilemma: { current, waiting } }) => ({ dilemma: current, waiting })
const mapDispatchToProps = (dispatch) => {
  return {
    makeChoice: (choice) => {
      dispatch(sendChoice(choice))
    },
    newGame: () => {
      dispatch(newGame())
    }
  }
}
const DilemmaContainer = connect(mapStateToProps, mapDispatchToProps)(Dilemma)

export default DilemmaContainer

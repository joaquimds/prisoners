import './game.scss'

import React, { Component } from 'react'
import { connect } from 'react-redux'

import { newGame, sendChoice } from '../../actions/socket'
import PaymentForm from '../payment-form/payment-form'
import { CHOICES, OUTCOMES } from '../../constants'
import { isDilemmaWaiting, isDilemmaComplete } from '../../util'

class Game extends Component {
  componentDidUpdate () {
    if (this.shouldRerender()) {
      setTimeout(() => this.setState({}), 1000)
    }
  }

  shouldRerender () {
    const { dilemma } = this.props
    if (dilemma) {
      return isDilemmaWaiting(dilemma) || !isDilemmaComplete(dilemma)
    }
    return false
  }

  render () {
    const fatalError = this.props.game.error && this.props.game.error.fatal
    return (
      <div className='game'>
        {this.renderMessage()}
        {
          !fatalError ? this.renderControls() : this.renderReloadButton()
        }
      </div>
    )
  }

  renderMessage () {
    const message = this.getMessage()
    return message ? <p className='game__message'>{message}</p> : null
  }

  getMessage () {
    const { game, dilemma } = this.props

    if (game.error && game.error.message) {
      return game.error.message
    }

    if (game.waiting) {
      return 'Waiting for a game...'
    }

    if (!dilemma) {
      return 'Play now!'
    }

    switch (dilemma.outcome) {
      case OUTCOMES.LOSE:
        return 'You both tried to steal. You lose!'
      case OUTCOMES.STEAL:
        return dilemma.hasWon ? 'You won with a steal!' : 'You lost to a steal!'
      case OUTCOMES.SPLIT:
        return 'You won with a split!'
      default:
        const now = Date.now()
        if (dilemma.readyTimestamp && dilemma.readyTimestamp > now) {
          return `You may choose in ${Math.ceil((dilemma.readyTimestamp - now) / 1000)}`
        }
        if (dilemma.endTimestamp && dilemma.endTimestamp < now) {
          return `Time's up!`
        }
        if (dilemma.players < 2) {
          return 'Waiting for a partner...'
        }
        if (dilemma.choice) {
          return 'Waiting for your partner...'
        }
        return 'Make your choice!'
    }
  }

  renderControls () {
    const controls = [
      this.renderTimeRemaining(),
      this.renderButtons(),
      this.renderPaymentForm(),
      this.renderNewGameButton()
    ].filter(Boolean)
    if (!controls.length) {
      return null
    }
    return <div className='game__controls'>{controls}</div>
  }

  renderTimeRemaining () {
    const { dilemma } = this.props
    if (!dilemma) {
      return null
    }
    if (isDilemmaWaiting(dilemma)) {
      return null
    }
    if (isDilemmaComplete(dilemma)) {
      return null
    }
    return <p key='remaining' className='game__remaining'>Time remaining: {Math.floor((dilemma.endTimestamp - Date.now()) / 1000)}</p>
  }

  renderButtons () {
    const { dilemma, makeChoice } = this.props
    if (!dilemma) {
      return null
    }
    if (isDilemmaComplete(dilemma)) {
      return null
    }
    const disabled = isDilemmaWaiting(dilemma)
    return (
      <div key='choices' className='game__choices'>
        {
          CHOICES.map(choice => (
            <button className={`game__choice ${choice === dilemma.choice ? ' game__choice--selected' : ''}`}
              key={choice} onClick={() => makeChoice(choice)} disabled={disabled}>
              {choice}
            </button>
          ))
        }
      </div>
    )
  }

  renderPaymentForm () {
    const { dilemma } = this.props
    if (!dilemma || !dilemma.hasWon) {
      return null
    }
    return <PaymentForm key='payment' />
  }

  renderNewGameButton () {
    const { game, dilemma } = this.props
    if (game.waiting) {
      return null
    }
    if (dilemma && !isDilemmaComplete(dilemma)) {
      return null
    }
    return <button key='reset' className='game__reset' onClick={() => this.props.newGame()}>New Game</button>
  }

  renderReloadButton () {
    return <button className='game__reload' onClick={() => window.location.reload()}>Please reload</button>
  }
}

const mapStateToProps = ({ game, dilemma, payment }) => ({ game, dilemma, payment })
const mapDispatchToProps = (dispatch) => {
  return {
    newGame: () => {
      dispatch(newGame())
    },
    makeChoice: (choice) => {
      dispatch(sendChoice(choice))
    }
  }
}
const GameContainer = connect(mapStateToProps, mapDispatchToProps)(Game)

export default GameContainer

import './game.scss'

import React, { Component } from 'react'
import { connect } from 'react-redux'

import { newGame } from '../../actions/socket'
import Dilemma from '../dilemma/dilemma'
import PaymentForm from '../payment-form/payment-form'
import { OUTCOMES } from '../../constants'

class Game extends Component {
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
  }

  render () {
    return (
      <div className='game'>
        {this.renderMessage()}
        <Dilemma />
        {this.renderPaymentForm()}
        {this.renderNewGameButton()}
      </div>
    )
  }

  renderMessage () {
    const message = this.getMessage()
    return message ? <p className='game__message'>{message}</p> : null
  }

  renderPaymentForm () {
    const { dilemma } = this.props
    if (!dilemma || !dilemma.hasWon) {
      return null
    }
    return <PaymentForm />
  }

  renderNewGameButton () {
    const { game, dilemma } = this.props
    if (game.waiting) {
      return null
    }
    if (dilemma && dilemma.outcome === OUTCOMES.PENDING) {
      if (!dilemma.endTimestamp || dilemma.endTimestamp > Date.now()) {
        return null
      }
    }
    return <button className='game__button' onClick={() => this.props.newGame()}>New Game</button>
  }
}

const mapStateToProps = ({ game, dilemma, payment }) => ({ game, dilemma, payment })
const mapDispatchToProps = (dispatch) => {
  return {
    newGame: () => {
      dispatch(newGame())
    }
  }
}
const GameContainer = connect(mapStateToProps, mapDispatchToProps)(Game)

export default GameContainer

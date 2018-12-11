import './game.scss'

import React, { Component } from 'react'
import { connect } from 'react-redux'

import { newGame } from '../../actions/socket'
import Dilemma from '../dilemma/dilemma'
import PaymentForm from '../payment-form/payment-form'
import { OUTCOMES } from '../../constants'

const renderDonateButton = () => (
  <form action='https://www.paypal.com/cgi-bin/webscr' method='post' target='_top' className='game__donate'>
    <input type='hidden' name='cmd' value='_s-xclick' />
    <input type='hidden' name='hosted_button_id' value='XMRHM6EPJLGYA' />
    <input type='image' src='https://www.paypalobjects.com/en_GB/i/btn/btn_donate_LG.gif' name='submit'
      title='PayPal - The safer, easier way to pay online!' alt='Donate with PayPal button' />
    <img alt='' border='0' src='https://www.paypal.com/en_GB/i/scr/pixel.gif' width='1' height='1' />
  </form>
)

class Game extends Component {
  getMessage () {
    const { game, dilemma } = this.props

    if (game.waiting) {
      return 'Waiting for a game...'
    }

    if (!dilemma) {
      return 'Play now!'
    }
  }

  render () {
    const { game } = this.props
    return (
      <div className='game'>
        <h2>Dilemma</h2>
        <div className='game__intro'>
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
        {!game.error ? (
          <div className='game__main'>
            {this.renderMessage()}
            <Dilemma />
            {this.renderPaymentForm()}
            {this.renderNewGameButton()}
          </div>
        ) : this.renderError()}
        {renderDonateButton()}
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
      return null
    }
    return <button className='game__button' onClick={() => this.props.newGame()}>New Game</button>
  }

  renderError () {
    const { game: { error } } = this.props
    return (
      <div className='game__error'>
        <p className='game__message'>{error.message}</p>
        {error.fatal ? (
          <button className='game__button' onClick={() => window.location.reload()}>Please reload</button>
        ) : ''}
      </div>
    )
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

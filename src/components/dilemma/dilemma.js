import './dilemma.scss'

import React, { Component } from 'react'
import { connect } from 'react-redux'

import { CHOICES, OUTCOMES } from '../../constants'
import { newGame, sendChoice, sendEmail } from '../../actions/socket'
import { changeEmail } from '../../actions/email'

class Dilemma extends Component {
  componentDidUpdate () {
    const { dilemma } = this.props
    if (dilemma && dilemma.readyTimestamp && dilemma.readyTimestamp > Date.now()) {
      setTimeout(() => this.setState({}), 1000)
    }
  }

  getMessage () {
    const { dilemma, waiting, error } = this.props

    if (error) {
      return error
    }

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
            return 'Waiting for your partner...'
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

  getPaymentMessage () {
    const { dilemma, email, paymentSuccess, waitingForPayment } = this.props
    if (!dilemma) {
      return null
    }
    if (!waitingForPayment && !paymentSuccess) {
      return null
    }
    const amount = dilemma.hasWon ? '1' : '0.50'
    if (waitingForPayment) {
      return (
        <p>
          Paying &pound;{amount} to {email}...
        </p>
      )
    }
    if (paymentSuccess) {
      return (
        <p>
          Paid &pound;{amount} to {email}. Please be patient:
          it may take up to an hour to arrive in your account.
        </p>
      )
    }
  }

  getButtons () {
    const { dilemma, waiting, makeChoice, newGame, paymentSuccess } = this.props
    const inPlay = dilemma && dilemma.outcome === OUTCOMES.PENDING
    const hasWon = dilemma && dilemma.hasWon

    if (waiting) {
      return []
    }

    if (hasWon && !paymentSuccess) {
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

  getForm () {
    const { dilemma, email, changeEmail, paymentSuccess } = this.props
    if (!dilemma) {
      return null
    }
    if (!dilemma.hasWon) {
      return null
    }
    if (paymentSuccess) {
      return null
    }
    return (
      <form className='dilemma__form' onSubmit={(e) => this.onSubmit(e)}>
        <label htmlFor='email'>Enter your email address</label>
        <input id='email' type='text' value={email} onChange={(e) => changeEmail(e.target.value)} />
        <button className='dilemma__choice' type='submit'>Collect Winnings</button>
      </form>
    )
  }

  onSubmit (e) {
    e.preventDefault()
    const { email, sendEmail } = this.props
    sendEmail(email)
  }

  render () {
    const message = this.getMessage()
    const paymentMessage = this.getPaymentMessage()
    const buttons = this.getButtons()
    const form = this.getForm()
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
          {paymentMessage}
          {form}
          <div className='dilemma__choices'>
            {buttons}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ error, email, dilemma: { current, waiting, waitingForPayment, paymentSuccess } }) => (
  { dilemma: current, error, waiting, email, waitingForPayment, paymentSuccess }
)
const mapDispatchToProps = (dispatch) => {
  return {
    makeChoice: (choice) => {
      dispatch(sendChoice(choice))
    },
    newGame: () => {
      dispatch(newGame())
    },
    changeEmail: (email) => {
      dispatch(changeEmail(email))
    },
    sendEmail: (email) => {
      dispatch(sendEmail(email))
    }
  }
}
const DilemmaContainer = connect(mapStateToProps, mapDispatchToProps)(Dilemma)

export default DilemmaContainer

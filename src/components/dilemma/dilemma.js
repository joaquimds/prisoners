import './dilemma.scss'

import React from 'react'
import { connect } from 'react-redux'

import { CHOICES, OUTCOMES } from '../../constants'
import { newGame, sendChoice } from '../../actions/socket'

const Dilemma = ({ dilemma, makeChoice, newGame }) => {
  const inPlay = dilemma && dilemma.outcome === OUTCOMES.PENDING

  let message = 'Play now!'
  if (dilemma) {
    switch (dilemma.outcome) {
      case OUTCOMES.LOSE:
        message = 'You both tried to steal. You lose!'
        break
      case OUTCOMES.STEAL:
        message = dilemma.hasWon ? 'You won with a steal!' : 'You lost to a steal!'
        break
      case OUTCOMES.SPLIT:
        message = 'You won with a split!'
        break
      default:
        message = dilemma.players < 2 ? 'Waiting for a partner...' : (
          dilemma.hasChosen ? 'Waiting...' : 'Make your choice!'
        )
    }
  }

  const buttons = inPlay ? (
    CHOICES.map(choice => (
      <button className='dilemma__choice' key={choice} onClick={() => makeChoice(choice)}>{choice}</button>
    ))
  ) : <button className='dilemma__choice' key='new' onClick={() => newGame()}>New Game</button>

  return (
    <div className='dilemma'>
      <h2>Dilemma</h2>
      <div className='dilemma__intro'>
        <p>
          Play Prisoner's Dilemma online, for real money!
        </p>
        <p>
          Each game has a top prize of &pound;1. Each game has two players. If both players split, they receive
          50p each. If one player splits and one steals, the stealer receives £1 and the splitter receives nothing.
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

const mapStateToProps = ({ dilemma }) => ({ dilemma })
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

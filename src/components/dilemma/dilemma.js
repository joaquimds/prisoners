import './dilemma.scss'

import React from 'react'
import { connect } from 'react-redux'

import { sendChoice } from '../../actions/socket'

const Dilemma = ({ dilemma, makeChoice }) => {
  if (!dilemma) {
    return null
  }
  return (
    <div className='dilemma'>
      <h2>Dilemma</h2>
      <div className='dilemma__summary'>
        <p>Players: {dilemma.players}</p>
        <p>Outcome: {dilemma.outcome}</p>
        { dilemma.winner ? <p>Winner: {dilemma.winner}</p> : '' }
      </div>
      <div className='dilemma__choices'>
        <button onClick={() => makeChoice('split')}>Split</button>
        <button onClick={() => makeChoice('steal')}>Steal</button>
      </div>
    </div>
  )
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

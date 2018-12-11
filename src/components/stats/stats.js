import './stats.scss'

import React from 'react'
import { connect } from 'react-redux'

const { OUTCOMES } = require('../../constants')
const COMPLETE_OUTCOMES = [OUTCOMES.SPLIT, OUTCOMES.STEAL, OUTCOMES.LOSE]

const prettyPrint = (outcome) => {
  if (outcome === OUTCOMES.LOSE) {
    return 'Losses'
  }
  return outcome + 's'
}

const Stats = ({ stats }) => (
  <div className='stats'>
    <h3>Stats</h3>
    {stats ? (
      COMPLETE_OUTCOMES.map(outcome => (
        <div className={`stats__row stats__row--${outcome}`} key={outcome}>
          <div className='stats__column'>{prettyPrint(outcome)}</div>
          <div className='stats__column'>{stats[outcome]}</div>
        </div>
      ))
    ) : (
      <p>No data</p>
    )}
  </div>
)

const mapStateToProps = ({ stats }) => ({ stats })

const StatsContainer = connect(mapStateToProps)(Stats)

export default StatsContainer

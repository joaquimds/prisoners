import './main.scss'

import React from 'react'
import Game from '../game/game'

const Main = () => (
  <div className='main'>
    <h2>Dilemma</h2>
    <div className='main__intro'>
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
    <Game />
    <form action='https://www.paypal.com/cgi-bin/webscr' method='post' target='_top' className='main__donate'>
      <input type='hidden' name='cmd' value='_s-xclick' />
      <input type='hidden' name='hosted_button_id' value='XMRHM6EPJLGYA' />
      <input type='image' src='https://www.paypalobjects.com/en_GB/i/btn/btn_donate_LG.gif' name='submit'
        title='PayPal - The safer, easier way to pay online!' alt='Donate with PayPal button' />
      <img alt='' border='0' src='https://www.paypal.com/en_GB/i/scr/pixel.gif' width='1' height='1' />
    </form>
  </div>
)

export default Main

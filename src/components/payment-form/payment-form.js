import './payment-form.scss'

import React, { Component } from 'react'
import connect from 'react-redux/es/connect/connect'

import { changeEmail } from '../../actions/email'
import { sendEmail } from '../../actions/socket'

class PaymentForm extends Component {
  onSubmit (e) {
    e.preventDefault()
    const { email, sendEmail } = this.props
    sendEmail(email)
  }

  render () {
    const { email, changeEmail, waiting, success } = this.props
    const message = waiting ? 'Connecting to PayPal...' : (
      success ? 'Paid!' : (
        success === false ? 'Error' : ''
      )
    )
    return (
      <form className='payment-form' onSubmit={(e) => this.onSubmit(e)}>
        <label htmlFor='email'>Enter your email address:</label>
        <input id='email' type='text' value={email} onChange={(e) => changeEmail(e.target.value)} disabled={success} />
        <button className='payment-form__button' type='submit' disabled={success}>Collect Winnings</button>
        <small>{message}</small>
      </form>
    )
  }
}

const mapStateToProps = ({ payment: { email, waiting, success } }) => ({ email, waiting, success })

const mapDispatchToProps = (dispatch) => {
  return {
    changeEmail: (email) => {
      dispatch(changeEmail(email))
    },
    sendEmail: (email) => {
      dispatch(sendEmail(email))
    }
  }
}

const PaymentFormContainer = connect(mapStateToProps, mapDispatchToProps)(PaymentForm)
export default PaymentFormContainer

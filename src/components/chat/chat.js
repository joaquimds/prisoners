import './chat.scss'

import React, { Component } from 'react'
import { connect } from 'react-redux'

import { changeMessage } from '../../actions/chat'
import { sendMessage } from '../../actions/socket'

class Chat extends Component {
  constructor (props) {
    super(props)
    this.messagesList = React.createRef()
  }

  componentDidUpdate () {
    const messagesList = this.messagesList.current
    if (messagesList) {
      messagesList.scrollTop = messagesList.scrollHeight
    }
  }

  onSubmit (e) {
    e.preventDefault()
    this.props.sendMessage(this.props.message)
  }

  render () {
    const { messages, message, changeMessage } = this.props

    return (
      <div className='chat'>
        <h2>Chat</h2>
        {messages.length ? (
          <ul ref={this.messagesList} className='chat__messages'>
            {
              messages.map((m, i) => (
                <li className='chat__message' key={i}>
                  <strong className={`message__from message__from--${m.from.toLowerCase()}`}>{m.from}:</strong>
                  <span className='message__content'>{m.content}</span>
                </li>)
              )
            }
          </ul>
        ) : <em className='chat__placeholder'>No messages</em>}
        <form className='chat__form' onSubmit={(e) => this.onSubmit(e)}>
          <label htmlFor='message'>Write Message</label>
          <input id='message' type='text' value={message} onChange={(e) => changeMessage(e.target.value)} />
        </form>
      </div>
    )
  }
}

const mapStateToProps = ({ chat: { messages, message } }) => ({ messages, message })

const mapDispatchToProps = (dispatch) => {
  return {
    changeMessage: (message) => dispatch(changeMessage(message)),
    sendMessage: (message) => dispatch(sendMessage(message))
  }
}

const ChatContainer = connect(mapStateToProps, mapDispatchToProps)(Chat)

export default ChatContainer

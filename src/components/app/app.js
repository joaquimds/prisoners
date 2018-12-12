import './app.scss'

import React, { Component } from 'react'
import connect from 'react-redux/es/connect/connect'

import Main from '../main/main'
import Chat from '../chat/chat'
import { subscribe } from '../../actions/socket'

const idleTitle = document.title
const playingTitle = document.title + ' | Playing'

class App extends Component {
  componentDidMount () {
    this.titleAlertHandle = null
    this.props.subscribe()
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) {
        this.hideTitleAlert()
      }
    })
  }
  componentDidUpdate (prevProps) {
    if (!this.props.dilemma) {
      document.title = idleTitle
      return
    }
    if (!prevProps.dilemma) {
      this.showTitleAlert()
    }
  }
  componentWillUnmount () {
    this.props.unsubscribe && this.props.unsubscribe()
  }
  render () {
    return (
      <div className='app'>
        <Main />
        <Chat />
      </div>
    )
  }
  showTitleAlert () {
    document.title = playingTitle
    if (!document.hidden) {
      return
    }
    this.titleAlertHandle = setInterval(() => {
      document.title = document.title === playingTitle ? idleTitle : playingTitle
    }, 2000)
  }
  hideTitleAlert () {
    if (this.titleAlertHandle !== null) {
      clearInterval(this.titleAlertHandle)
    }
    this.titleAlertHandle = null
    document.title = this.props.dilemma ? playingTitle : idleTitle
  }
}

const mapStateToProps = ({ socket, dilemma }) => ({ unsubscribe: socket.unsubscribe, dilemma })
const mapDispatchToProps = (dispatch) => {
  return {
    subscribe: () => {
      dispatch(subscribe())
    }
  }
}

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App)

export default AppContainer

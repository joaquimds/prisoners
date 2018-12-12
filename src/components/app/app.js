import './app.scss'

import React, { Component } from 'react'
import connect from 'react-redux/es/connect/connect'

import Main from '../main/main'
import Chat from '../chat/chat'
import { subscribe } from '../../actions/socket'

const initialTitle = document.title
const alertTitle = '* ' + document.title

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
    if (this.props.dilemma && !prevProps.dilemma && document.hidden) {
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
    document.title = alertTitle
    this.titleAlertHandle = setInterval(() => {
      document.title = document.title === alertTitle ? initialTitle : alertTitle
    }, 1500)
  }
  hideTitleAlert () {
    if (this.titleAlertHandle !== null) {
      clearInterval(this.titleAlertHandle)
      this.titleAlertHandle = null
      document.title = initialTitle
    }
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

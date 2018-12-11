import './app.scss'

import React, { Component } from 'react'
import connect from 'react-redux/es/connect/connect'

import Main from '../main/main'
import Chat from '../chat/chat'
import { subscribe } from '../../actions/socket'

class App extends Component {
  componentDidMount () {
    this.props.subscribe()
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
}

const mapStateToProps = ({ socket }) => ({ unsubscribe: socket.unsubscribe })
const mapDispatchToProps = (dispatch) => {
  return {
    subscribe: () => {
      dispatch(subscribe())
    }
  }
}

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App)

export default AppContainer

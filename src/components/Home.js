import React, { Component } from 'react'
import { listen, send } from '../utils/socketUtils'
import * as Rx from 'rxjs'
import './Home.css'
import { PING } from '../epics/messageEpics'
import { connect } from 'react-redux'

class App extends Component {

  constructor (props) {
    super(props)
    this.state = {
      users: [],
      messages: [],
      text: ''
    }
  }

  componentDidMount () {

    const username$ = Rx.of(randomName())
    send(username$, 'save username')

    listen('all users').subscribe(users => {
      console.log('getting all users', users)
      this.setState({users})
    })
    listen('new user').subscribe(user => {
        console.log('getting new user', user)
        this.setState(prevState => ({users: [...prevState.users, user]}))
      }
    )
    listen('remove user').subscribe(userId => {
        console.log('removing user', userId)
        this.setState(prevState => ({users: prevState.users.filter(u => u.id !== userId)}))
      }
    )
  }

  onTextInput = event => {
    this.setState({text: event.target.value})
  }

  onSubmit = () => {
    this.setState({text: ''})
    this.props.ping()
  }

  render () {
    return (
      <div>
        {this.props.message}
        <div className='userContainer'>
          <b>Users</b>
          {this.state.users.map(user => <div key={user.id}>{user.name}</div>)}
        </div>
        <div className='messageContainer'>
          <div className='messages'>
            {this.state.messages.map((msg, idx) => <div key={idx}><b>{msg.from}</b>: {msg.message}</div>)}
          </div>
          <input type="text" id="msgInput" value={this.state.text} onChange={this.onTextInput}/>
          <button onClick={this.onSubmit}>Send</button>
        </div>
      </div>
    )
  }
}

const randomName = () => {
  let text = ''
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (let i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  return text
}

const mapStateToProps = ({messages}) => ({
  messages
})

const mapDispatchToProps = dispatch => ({
  ping: () => dispatch({type: PING})
})

export default connect(mapStateToProps, mapDispatchToProps)(App)

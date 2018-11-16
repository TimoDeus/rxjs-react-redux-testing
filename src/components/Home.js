import React, { Component } from 'react'
import { listen } from '../utils/socketUtils'
import './Home.css'
import { connect } from 'react-redux'
import { addUser, removeUser, setUsers, storeOwnUser } from '../actions/user'
import { addMessage, sendMessage } from '../actions/message'

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
    this.props.doStoreOwnUser(randomName())
    listen('all users').subscribe(users => this.props.doSetUsers(users))
    listen('new user').subscribe(user => this.props.doAddUser(user))
    listen('remove user').subscribe(user => this.props.doRemoveUser(user))
    listen('chat message').subscribe(message => this.props.doAddMessage(message))
  }

  onTextInput = event => {
    this.setState({ text: event.target.value })
  }

  onSubmit = event => {
    this.props.onSendMessage(this.state.text)
    this.setState({ text: '' })
    event.preventDefault()
  }

  render () {
    return (
      <div>
        {this.props.message}
        <div className="userContainer">
          <b>Users</b>
          {this.props.users.map((user, idx) => <div key={idx}>{user.name}</div>)}
        </div>
        <div className="messageContainer">
          <div className="messages">
            {this.props.messages.map((msg, idx) => <div key={idx}>{msg.from} {msg.message}</div>)}
          </div>
          <form onSubmit={this.onSubmit}>
            <input type="text" id="msgInput" value={this.state.text} onChange={this.onTextInput}/>
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
    )
  }
}

const randomName = () => {
  let text = ''
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (let i = 0; i < 5; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}

const mapStateToProps = ({ messages, user }) => ({
  messages: messages.messages,
  ownName: user.ownName,
  users: user.users
})

const mapDispatchToProps = dispatch => ({
  onSendMessage: message => dispatch(sendMessage(message)),
  doAddMessage: message => dispatch(addMessage(message)),
  doStoreOwnUser: username => dispatch(storeOwnUser(username)),
  doAddUser: user => dispatch(addUser(user)),
  doSetUsers: users => dispatch(setUsers(users)),
  doRemoveUser: user => dispatch(removeUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App)

import { combineReducers } from 'redux'
import { messages } from './messages'
import { user } from './user'

const combinedReducers = combineReducers({
  messages,
  user
})

export default combinedReducers

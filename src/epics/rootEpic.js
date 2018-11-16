import { combineEpics } from 'redux-observable'
import { messageEpic } from './messageEpics'
import { userEpic } from './userEpics'

export const rootEpic = combineEpics(
  messageEpic,
  userEpic
)

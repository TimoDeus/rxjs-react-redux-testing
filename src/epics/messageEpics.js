import { map, tap } from 'rxjs/operators'
import { ofType } from 'redux-observable'
import { socket } from '../utils/socketUtils'
import { SEND_MSG_REQUEST, SEND_MSG_SUCCESS } from '../actions/message'

export const messageEpic = action$ => action$.pipe(
  ofType(SEND_MSG_REQUEST),
  map(action => action.payload),
  tap(message => socket.emit('chat message', message)),
  map(payload => ({ type: SEND_MSG_SUCCESS, payload }))
)

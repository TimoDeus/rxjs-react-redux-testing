import { map, tap } from 'rxjs/operators'
import { ofType } from 'redux-observable'
import { socket } from '../utils/socketUtils'
import { ADD_USER, STORE_OWN_USERNAME_REQUEST } from '../actions/user'

export const userEpic = action$ => action$.pipe(
  ofType(STORE_OWN_USERNAME_REQUEST),
  map(action => action.payload),
  tap(payload => socket.emit('save username', payload)),
  map(payload => ({ type: ADD_USER, payload: { name: payload } }))
)

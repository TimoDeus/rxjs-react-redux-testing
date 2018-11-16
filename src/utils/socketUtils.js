import * as Rx from 'rxjs'
import { map, mergeMap, takeUntil } from 'rxjs/operators'
import openSocket from 'socket.io-client'

export const socket = openSocket('http://localhost:3001')

const connect$ = Rx.fromEvent(socket, 'connect').pipe(map(() => socket))
const disconnect$ = Rx.fromEvent(socket, 'disconnect')

// On connection, listen for event
export const listen = (event) => {
  return connect$.pipe(
    mergeMap(socket => Rx.fromEvent(socket, event)),
    takeUntil(disconnect$)
  )
}

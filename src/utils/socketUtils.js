import * as Rx from 'rxjs'
import { map, mergeMap, takeUntil } from 'rxjs/operators'
import openSocket from 'socket.io-client'

const socket = openSocket('http://localhost:3001')

const connect$ = Rx.fromEvent(socket, 'connect').pipe(map(() => socket))
const disconnect$ = Rx.fromEvent(socket, 'disconnect')

// On connection, listen for event
export const listen = (event) => {
  return connect$.pipe(
    mergeMap(socket => Rx.fromEvent(socket, event)),
    takeUntil(disconnect$)
  )
}

// On connection, emit data from observable
export const send = (observable, event) => {
  console.log('sending oberservable', observable, event)
  return connect$.pipe(
    mergeMap(socket => observable.pipe(map(data => ({socket, data})))),
    takeUntil(disconnect$)
  ).subscribe(({socket, data}) => {
    console.log('sending data',event, data)
    return socket.emit(event, data)
  })
}

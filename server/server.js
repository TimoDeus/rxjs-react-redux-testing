const io = require('socket.io')()
const Rx = require('rxjs')
const {map, mergeMap, takeUntil} = require('rxjs/operators')

const port = 3001
io.listen(port)
console.log('socket.io listening on port ', port)

const getAllUsers = (allSockets) => {
  return Object.keys(allSockets)
    .filter(key => allSockets[key].name)
    .map(key => ({
      id: key,
      name: allSockets[key].name
    }))
}

// Stream of connections
const connection$ = Rx.fromEvent(io, 'connection').pipe(map(socket => ({io, socket})))
// On connection, send array of all users
connection$.subscribe(({io, socket}) => {
  socket.emit('all users', getAllUsers(io.sockets.sockets))
})

// Stream of disconnections
const disconnect$ = connection$.pipe(
  mergeMap(({socket}) => Rx.fromEvent(socket, 'disconnect').pipe(map(() => socket)))
)
// On disconnect, tell other users
disconnect$.subscribe(socket => socket.broadcast.emit('remove user', socket.id))

const listen = eventName => connection$.pipe(
  mergeMap(({io, socket}) =>
    Rx.fromEvent(socket, eventName).pipe(
      map(data => ({io, socket, data})),
      takeUntil(Rx.fromEvent(socket, 'disconnect'))
    )
  )
)

listen('save username').subscribe(({io, socket, data}) => {
  io.sockets.sockets[socket.id].name = data
  io.emit('new user', {
    id: socket.id,
    name: data
  })
})

listen('chat message').subscribe(({io, socket, data}) => {
  console.log('received message', data)
  return io.emit('chat message', {
    from: socket.name,
    message: data
  })
})



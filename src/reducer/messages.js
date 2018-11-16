import { PING, PONG } from '../epics/messageEpics'

export const messages = (state = {}, action) => {
  switch (action.type) {
    case PING:
      return { isLoading: true }
    case PONG:
      return { isLoading: false }
    default:
      return state
  }
}

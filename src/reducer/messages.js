import { ADD_MESSAGE, SEND_MSG_SUCCESS } from '../actions/message'

const initialState = {
  messages: []
}

export const messages = (state = initialState, action) => {
  switch (action.type) {
    case SEND_MSG_SUCCESS:
      return { messages: [...state.messages, { from: 'me', message: action.payload }] }
    case ADD_MESSAGE:
      return { messages: [...state.messages, action.payload] }
    default:
      return state
  }
}

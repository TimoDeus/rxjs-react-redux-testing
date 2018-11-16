export const SEND_MSG_REQUEST = 'SEND_MSG_REQUEST'
export const SEND_MSG_SUCCESS = 'SEND_MSG_SUCCESS'
export const ADD_MESSAGE = 'ADD_MESSAGE'

export const sendMessage = message => ({ type: SEND_MSG_REQUEST, payload: message })
export const addMessage = message => ({ type: ADD_MESSAGE, payload: message })

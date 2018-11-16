export const STORE_OWN_USERNAME_REQUEST = 'STORE_OWN_USERNAME_REQUEST'
export const STORE_OWN_USERNAME_SUCCESS = 'STORE_OWN_USERNAME_SUCCESS'
export const ADD_USER = 'ADD_USER'
export const SET_USERS = 'SET_USERS'
export const REMOVE_USER = 'REMOVE_USER'

export const storeOwnUser = username => ({ type: STORE_OWN_USERNAME_REQUEST, payload: username })
export const addUser = user => ({ type: ADD_USER, payload: user })
export const setUsers = users => ({ type: SET_USERS, payload: users })
export const removeUser = user => ({ type: REMOVE_USER, payload: user })

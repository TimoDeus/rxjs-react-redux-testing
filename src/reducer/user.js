import { ADD_USER, REMOVE_USER, SET_USERS, STORE_OWN_USERNAME_SUCCESS } from '../actions/user'

const initialState = {
  ownName: undefined,
  users: []
}

export const user = (state = initialState, action) => {
  switch (action.type) {
    case STORE_OWN_USERNAME_SUCCESS:
      return { ...state, ownName: action.payload }
    case ADD_USER:
      return { ...state, users: [...state.users, action.payload] }
    case SET_USERS:
      return { ...state, users: [...state.users, ...action.payload] }
    case REMOVE_USER: {
      return { ...state, users: state.users.filter(user => user.name !== action.payload.name) }
    }
    default:
      return state
  }
}

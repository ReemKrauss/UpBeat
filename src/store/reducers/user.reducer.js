const initialState = {
  loggedUser: null,
}

export function userReducer(state = initialState, action = {}) {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, loggedUser: action.user }
    default:
      return state
  }
}

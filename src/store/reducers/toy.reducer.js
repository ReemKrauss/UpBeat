const initialState = {
  toys: [],
  filterBy: {
    name: '',
    price: '',
    inStock: false,
    labels: [],
  },
}

export function toyReducer(state = initialState, action = {}) {
  let toys

  switch (action.type) {
    case 'SET_TOYS':
      return { ...state, toys: action.toys }
    case 'REMOVE_TOY':
      toys = state.toys.filter((toy) => toy._id !== action.toyId)
      return { ...state, toys }
    case 'SAVE_TOY':
      const existingToy = state.toys.findIndex((toy) => toy._id === action.toy._id)
      if (existingToy >= 0) {
        toys = state.toys.map((toy, idx) => (idx === existingToy ? action.toy : toy))
      } else toys = [action.toy, ...state.toys]
      return { ...state, toys }
    case 'SET_FILTER':
      return { ...state, filterBy: action.filter }
    default:
      return state
  }
}

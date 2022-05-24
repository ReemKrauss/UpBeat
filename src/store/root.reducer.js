import { combineReducers } from 'redux'
import { toyReducer } from './reducers/toy.reducer'
import { userReducer } from './reducers/user.reducer'

export const rootReducer = combineReducers({
  toyModule: toyReducer,
  userModule: userReducer,
})

import { combineReducers } from 'redux'
import { playlistReducer } from './reducers/playlist.reducer'

import { userReducer } from './reducers/user.reducer'

export const rootReducer = combineReducers({

  userModule: userReducer,
  playlistModule: playlistReducer,
})

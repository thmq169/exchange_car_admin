import { combineReducers } from '@reduxjs/toolkit'

import post from './post-slice'
import auth from './auth-slice'

const rootReducer = combineReducers({
  post,
  auth,
})

export default rootReducer

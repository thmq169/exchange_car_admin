import { combineReducers } from '@reduxjs/toolkit'

import post from './post-slice'
import auth from './auth-slice'
import car from './car-slice'
import customer from './customer-slice'
import app from './app-slice'

const rootReducer = combineReducers({
  app,
  post,
  auth,
  car,
  customer,
})

export default rootReducer

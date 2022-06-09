import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth'
import placesVerificationsReducer from './placesVerifications'

export let store = configureStore({
  reducer: {
      auth: authReducer,
      places: placesVerificationsReducer,
      
  }, 

})
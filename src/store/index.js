import { configureStore } from '@reduxjs/toolkit'
import userSlice from './userSlice'

let store = configureStore({
    reducer: {
        userSlice
    }
})

export default store
import { configureStore } from '@reduxjs/toolkit'
import postsReducer from './slices/postsSlice'
import settingsReducer from './slices/settingsSlice'

const store = configureStore({
	reducer: {
		posts: postsReducer,
		settings: settingsReducer,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store

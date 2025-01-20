import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Settings {
	layout: {
		current: string
		params: {
			grid: { columns: number; rows: number }
			masonry: { columns: number; rows: number }
		}
	}
	template: string
	navigation: string
}

const initialState: Settings = {
	layout: {
		current: 'grid',
		params: { grid: { columns: 3, rows: 2 }, masonry: { columns: 2, rows: 3 } },
	},
	template: 'default',
	navigation: 'pagination',
}

const settingsSlice = createSlice({
	name: 'settings',
	initialState,
	reducers: {
		updateSettings(state, action: PayloadAction<Partial<Settings>>) {
			return { ...state, ...action.payload }
		},
	},
})

export const { updateSettings } = settingsSlice.actions
export type RootState = Settings
export default settingsSlice.reducer

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

const API_BASE_URL = 'http://localhost:4000'
export interface Settings {
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
		current: '',
		params: {
			grid: { columns: 0, rows: 0 },
			masonry: { columns: 0, rows: 0 },
		},
	},
	template: '',
	navigation: '',
}

export const fetchSettings = createAsyncThunk<Settings>(
	'settings/fetchSettings',
	async () => {
		const response = await fetch(`${API_BASE_URL}/settings`)
		if (!response.ok) {
			throw new Error('Network response was not ok')
		}
		return await response.json()
	}
)

const settingsSlice = createSlice({
	name: 'settings',
	initialState,
	reducers: {
		updateSettings(state, action: PayloadAction<Partial<Settings>>) {
			return { ...state, ...action.payload }
		},
	},
	extraReducers: builder => {
		builder
			.addCase(fetchSettings.fulfilled, (state, action) => {
				return { ...state, ...action.payload }
			})
			.addCase(fetchSettings.rejected, (_, action) => {
				console.error('Failed to fetch settings:', action.error)
			})
	},
})
export const { updateSettings } = settingsSlice.actions
export type RootState = Settings
export default settingsSlice.reducer

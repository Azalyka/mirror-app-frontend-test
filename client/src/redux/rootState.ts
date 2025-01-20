import { RootState as PostsState } from './slices/postsSlice'
import { RootState as SettingsState } from './slices/settingsSlice'

export interface RootState {
	posts: PostsState
	settings: SettingsState
}

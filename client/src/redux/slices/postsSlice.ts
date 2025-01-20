import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Post {
	id: string
	caption: string
	likes: number
	comments: number
	date: string
	userId: string
}

interface PostsState {
	items: Post[]
}

const initialState: PostsState = {
	items: [],
}

const postsSlice = createSlice({
	name: 'posts',
	initialState,
	reducers: {
		setPosts(state, action: PayloadAction<Post[]>) {
			state.items = action.payload
		},
	},
})

export const { setPosts } = postsSlice.actions
export default postsSlice.reducer
export type RootState = PostsState

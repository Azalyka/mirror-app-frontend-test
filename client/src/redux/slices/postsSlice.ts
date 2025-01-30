import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

const API_BASE_URL = 'http://localhost:4000/posts?_expand=user&'
export interface Post {
	caption: string
	comments: number
	date: string
	id?: string
	likes: number
	premalink?: string
	user: { id: string; postId: string; username: string }
	userId?: string
}

interface PostsState {
	items: Post[]
	currentPage: number
}

const initialState: PostsState = {
	items: [],
	currentPage: 1,
}

export const fetchForSetPosts = createAsyncThunk<
	Post[],
	{ page: number; limit: number }
>('posts/fetchForSetPosts', async ({ page, limit }) => {
	console.log('Fetching posts for set page:', page, 'limit:', limit)
	const response = await fetch(`${API_BASE_URL}_page=${page}&_limit=${limit}`)
	return await response.json()
})

export const fetchForAddPosts = createAsyncThunk<
	Post[],
	{ page: number; limit: number }
>('posts/fetchForAddPosts', async ({ page, limit }) => {
	console.log('Fetching posts add for page:', page, 'limit:', limit)
	const response = await fetch(`${API_BASE_URL}_page=${page}&_limit=${limit}`)
	return await response.json()
})

const postsSlice = createSlice({
	name: 'posts',
	initialState,
	reducers: {
		setPosts(state, action: PayloadAction<Post[]>) {
			state.items = action.payload
		},
		addPosts(state, action: PayloadAction<Post[]>) {
			state.items = [...state.items, ...action.payload]
		},
		setCurrentPage(state, action: PayloadAction<number>) {
			state.currentPage = action.payload
		},
		incrementPage(state) {
			state.currentPage += 1
		},
		resetCurrentPage(state) {
			state.currentPage = 1
		},
	},
	extraReducers: builder => {
		builder
			.addCase(fetchForAddPosts.fulfilled, (state, action) => {
				state.items = [...state.items, ...action.payload]
			})
			.addCase(fetchForSetPosts.fulfilled, (state, action) => {
				state.items = action.payload
			})
	},
})

export const {
	setPosts,
	addPosts,
	setCurrentPage,
	incrementPage,
	resetCurrentPage,
} = postsSlice.actions
export default postsSlice.reducer
export type RootState = PostsState

const API_BASE_URL = 'http://localhost:4000'

export const fetchPosts = async (page: number, limit: number) => {
	const response = await fetch(
		`${API_BASE_URL}/posts?_page=${page}&_limit=${limit}`
	)
	return await response.json()
}

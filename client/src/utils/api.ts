const API_BASE_URL = 'http://localhost:4000/' // Замените на ваш URL

export const fetchSettings = async () => {
	const response = await fetch(`${API_BASE_URL}/settings`)
	return await response.json()
}

export const fetchPosts = async () => {
	const response = await fetch(`${API_BASE_URL}/posts`)
	return await response.json()
}

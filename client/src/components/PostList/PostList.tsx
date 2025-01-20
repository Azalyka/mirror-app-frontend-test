import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/rootState'
import { setPosts } from '../../redux/slices/postsSlice'
import { fetchPosts } from '../../utils/api'
import PostCard from '../PostCard/PostCard'

const PostList: React.FC = () => {
	const dispatch = useDispatch()
	const posts = useSelector((state: RootState) => state.posts.items)

	useEffect(() => {
		const loadPosts = async () => {
			const data = await fetchPosts()
			dispatch(setPosts(data))
		}

		loadPosts()
	}, [dispatch])

	return (
		<div className='post-list'>
			{posts.map(post => (
				<PostCard key={post.id} {...post} />
			))}
		</div>
	)
}

export default PostList

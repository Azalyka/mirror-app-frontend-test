import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/rootState'
import { setPosts } from '../../redux/slices/postsSlice'
import { Settings } from '../../redux/slices/settingsSlice'
import { fetchPosts } from '../../utils/api'
import PostCard from '../PostCard/PostCard'
import './PostList.css'

const PostList: React.FC = () => {
	const dispatch = useDispatch()
	const posts = useSelector((state: RootState) => state.posts.items)
	const settings = useSelector((state: RootState) => state.settings)
	console.log(settings)
	const [page, setPage] = useState(1)

	const getLimitPosts = (settings: Settings) => {
		if (settings.layout.current === 'grid') {
			return (
				settings.layout.params.grid.columns * settings.layout.params.grid.rows
			)
		}
		return (
			settings.layout.params.masonry.columns *
			settings.layout.params.masonry.rows
		)
	}
	const limit = getLimitPosts(settings)

	const loadMorePosts = () => {
		setPage(prevPage => prevPage + 1)
	}

	useEffect(() => {
		const loadPosts = async () => {
			const data = await fetchPosts(page, limit)
			dispatch(setPosts(data))
		}

		loadPosts()
	}, [dispatch, page])

	return (
		<div className='post-list'>
			{posts.map(post => (
				<PostCard key={post.id} {...post} />
			))}
			{settings.navigation === 'load-more' && (
				<button onClick={loadMorePosts} className='load-more'>
					Загрузить больше
				</button>
			)}

			{settings.navigation === 'pagination' && (
				<div className='pagination'>
					<button
						onClick={() => setPage(prev => Math.max(prev - 1, 1))}
						disabled={page === 1}
					>
						Назад
					</button>
					<span>Страница {page}</span>
					<button onClick={loadMorePosts}>Вперед</button>
				</div>
			)}
		</div>
	)
}

export default PostList

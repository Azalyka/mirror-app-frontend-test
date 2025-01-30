import CSS from 'csstype'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/rootState'
import {
	fetchForAddPosts,
	fetchForSetPosts,
	incrementPage,
} from '../../redux/slices/postsSlice'
import { Settings } from '../../redux/slices/settingsSlice'
import { AppDispatch } from '../../redux/store'
import PostCard from '../PostCard/PostCard'
import './PostList.css'
import { RenderPagination } from './RenderPagination'

const PostList: React.FC = () => {
	const dispatch: AppDispatch = useDispatch()
	const posts = useSelector((state: RootState) => state.posts.items)
	const currentPage = useSelector((state: RootState) => state.posts.currentPage)
	const settings = useSelector((state: RootState) => state.settings)
	const currentLayout = settings.layout.current

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
	const totalPosts = 100
	const totalPages = Math.ceil(totalPosts / limit)

	const loadMorePosts = async () => {
		await dispatch(fetchForAddPosts({ page: currentPage, limit }))
	}

	const loadPosts = async () => {
		if (limit > 0) {
			await dispatch(fetchForSetPosts({ page: currentPage, limit }))
		}
	}

	useEffect(() => {
		if (currentPage === 1 || settings.navigation === 'pagination') {
			loadPosts()
		} else if (settings.navigation === 'load-more') {
			loadMorePosts()
		}
	}, [currentPage, limit])

	const postListContainerGrid: CSS.Properties = {
		display: 'grid',
		gridTemplateColumns: `repeat(${settings.layout.params.grid.columns}, minmax(200px, 1fr))`,
		gridTemplateRows: `repeat(${settings.layout.params.grid.rows}, 1fr)`,
		gap: '16px',
	}

	const postListContainerMasonry: CSS.Properties = {
		columnCount: `${settings.layout.params.masonry.columns}`,
		columnGap: '16px',
	}

	return (
		<div className='post-list-overlay'>
			<div
				style={
					currentLayout === 'grid'
						? postListContainerGrid
						: postListContainerMasonry
				}
			>
				{posts.map(post => (
					<PostCard key={post.id} {...post} template={settings.template} />
				))}
			</div>

			{settings.navigation === 'load-more' && (
				<button
					onClick={() => {
						dispatch(incrementPage())
					}}
					className='load-more'
				>
					Загрузить больше
				</button>
			)}

			{settings.navigation === 'pagination' && (
				<div className='pagination'>
					<RenderPagination totalPages={totalPages} />
				</div>
			)}
		</div>
	)
}

export default PostList

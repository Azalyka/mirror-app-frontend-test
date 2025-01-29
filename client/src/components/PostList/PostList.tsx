import CSS from 'csstype'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/rootState'
import {
	fetchForAddPosts,
	fetchForSetPosts,
	incrementPage,
	setCurrentPage,
} from '../../redux/slices/postsSlice'
import { Settings } from '../../redux/slices/settingsSlice'
import { AppDispatch } from '../../redux/store'
import PostCard from '../PostCard/PostCard'
import './PostList.css'

const API_BASE_URL = 'http://localhost:4000/posts?_expand=user&'

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
	console.log(limit)
	const totalPosts = 100
	const totalPages = Math.ceil(totalPosts / limit)

	const loadMorePosts = async () => {
		dispatch(incrementPage())
		await dispatch(fetchForAddPosts({ page: currentPage + 1, limit }))
	}

	const loadPosts = async () => {
		await dispatch(fetchForSetPosts({ page: currentPage, limit }))
	}

	useEffect(() => {
		loadPosts()
	}, [])

	const postList: CSS.Properties = {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		margin: '20px auto',
		marginLeft: '250px',
		paddingLeft: '20px',
	}

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

	const renderPagination = () => {
		const pages = []
		const step = 5

		pages.push(
			<button
				key={1}
				onClick={() => dispatch(setCurrentPage(1))}
				className={currentPage === 1 ? 'active' : ''}
			>
				1
			</button>
		)

		if (totalPages <= 7) {
			for (let i = 2; i <= totalPages; i++) {
				pages.push(
					<button
						key={i}
						onClick={() => dispatch(setCurrentPage(i))}
						className={currentPage === i ? 'active' : ''}
					>
						{i}
					</button>
				)
			}
		} else {
			if (currentPage <= 4) {
				for (let i = 2; i <= 5; i++) {
					pages.push(
						<button
							key={i}
							onClick={() => dispatch(setCurrentPage(i))}
							className={currentPage === i ? 'active' : ''}
						>
							{i}
						</button>
					)
				}
				pages.push(
					<button
						key='forward'
						onClick={() => dispatch(setCurrentPage(currentPage + step))}
					>
						...
					</button>
				)
			} else if (currentPage > 4 && currentPage < totalPages - 3) {
				pages.push(
					<button
						key='back'
						onClick={() => dispatch(setCurrentPage(currentPage - step))}
					>
						...
					</button>
				)
				for (let i = currentPage - 1; i <= currentPage + 1; i++) {
					pages.push(
						<button
							key={i}
							onClick={() => dispatch(setCurrentPage(i))}
							className={currentPage === i ? 'active' : ''}
						>
							{i}
						</button>
					)
				}
				pages.push(
					<button
						key='forward'
						onClick={() => dispatch(setCurrentPage(currentPage + step))}
					>
						...
					</button>
				)
			} else {
				pages.push(
					<button
						key='back'
						onClick={() => dispatch(setCurrentPage(currentPage - step))}
					>
						...
					</button>
				)
				for (let i = totalPages - 4; i <= totalPages; i++) {
					pages.push(
						<button
							key={i}
							onClick={() => dispatch(setCurrentPage(i))}
							className={currentPage === i ? 'active' : ''}
						>
							{i}
						</button>
					)
				}
			}
		}

		if (
			totalPages > 1 &&
			!pages.some(page => page.key === totalPages.toString())
		) {
			pages.push(
				<button
					key={totalPages}
					onClick={() => dispatch(setCurrentPage(totalPages))}
					className={currentPage === totalPages ? 'active' : ''}
				>
					{totalPages}
				</button>
			)
		}

		return pages
	}

	if (!settings.layout.current) {
		return <div>Загрузка</div>
	}
	return (
		<div style={postList}>
			<div
				style={
					currentLayout === 'grid'
						? postListContainerGrid
						: postListContainerMasonry
				}
			>
				{posts.map(post => (
					<PostCard key={post.id} {...post} />
				))}
			</div>

			{settings.navigation === 'load-more' && (
				<button onClick={loadMorePosts} className='load-more'>
					Загрузить больше
				</button>
			)}

			{settings.navigation === 'pagination' && (
				<div className='pagination'>{renderPagination()}</div>
			)}
		</div>
	)
}

export default PostList

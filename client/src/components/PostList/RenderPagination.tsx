import { useDispatch, useSelector } from 'react-redux'
import { setCurrentPage } from '../../redux/slices/postsSlice'
import { AppDispatch, RootState } from '../../redux/store'

interface RenderPaginationProps {
	totalPages: number
}

export const RenderPagination: React.FC<RenderPaginationProps> = ({
	totalPages,
}) => {
	const dispatch: AppDispatch = useDispatch()
	const currentPage = useSelector((state: RootState) => state.posts.currentPage)
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

import React from 'react'
import './PostCard.css'

interface PostCardProps {
	caption: string
	comments: number
	date: string
	likes: number
	user: { id: string; postId: string; username: string }
	template?: string
}

const PostCard: React.FC<PostCardProps> = ({
	caption,
	comments,
	date,
	likes,
	user,
	template = 'classic',
}) => {
	const formatDate = (dateString: string) => {
		const dateObj = new Date(dateString)
		const now = new Date()
		const diffTime = Math.abs(now.getTime() - dateObj.getTime())
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

		if (diffDays < 7) {
			let dayWord = 'день'
			if (diffDays >= 2 && diffDays <= 4) {
				dayWord = 'дня'
			} else if (diffDays >= 5) {
				dayWord = 'дней'
			}
			return `${diffDays} ${dayWord} назад`
		} else {
			const day = String(dateObj.getDate()).padStart(2, '0')
			const month = String(dateObj.getMonth() + 1).padStart(2, '0')
			const year = dateObj.getFullYear()
			return `${day}/${month}/${year}`
		}
	}

	return (
		<div className='post-card'>
			{template === 'hover' ? (
				<>
					<h3>{caption}</h3>
					<hr className='divider' />
					<p className='username'>{user.username}</p>
					<p className='date'>{formatDate(date)}</p>
					<hr className='divider' />
					<div className='stats'>
						<span>Лайков: {likes}</span>
						<span>Комментариев: {comments}</span>
					</div>
				</>
			) : (
				<>
					<p className='username'>{user.username}</p>
					<p className='date'>{formatDate(date)}</p>
					<hr className='divider' />
					<h3>{caption}</h3>
					<hr className='divider' />
					<div className='stats'>
						<span>Лайков: {likes}</span>
						<span>Комментариев: {comments}</span>
					</div>
				</>
			)}
		</div>
	)
}

export default PostCard

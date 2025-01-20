import React from 'react'

interface PostCardProps {
	caption: string
	likes: number
	comments: number
	date: string
	userId: string
}

const PostCard: React.FC<PostCardProps> = ({
	caption,
	likes,
	comments,
	date,
	userId,
}) => {
	const formatDate = (dateString: string) => {
		const dateObj = new Date(dateString)
		const now = new Date()
		const diffTime = Math.abs(now.getTime() - dateObj.getTime())
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

		return diffDays < 7
			? `${diffDays} день${diffDays > 1 ? 'а' : ''} назад`
			: dateObj.toLocaleDateString('ru-RU')
	}

	return (
		<div className='post-card'>
			<h3>{caption}</h3>
			<p>Лайков: {likes}</p>
			<p>Комментариев: {comments}</p>
			<p>Дата: {formatDate(date)}</p>
			<p>Пользователь: {userId}</p>
		</div>
	)
}

export default PostCard

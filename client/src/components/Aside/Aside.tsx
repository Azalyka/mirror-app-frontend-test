import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/rootState'
import { setCurrentPage } from '../../redux/slices/postsSlice'
import { fetchSettings, updateSettings } from '../../redux/slices/settingsSlice'
import { AppDispatch } from '../../redux/store'
import './Aside.css'

const Aside: React.FC = () => {
	const dispatch: AppDispatch = useDispatch()
	const settings = useSelector((state: RootState) => state.settings)

	useEffect(() => {
		dispatch(fetchSettings())
	}, [])

	const handleUpdateSettings = async () => {
		dispatch(setCurrentPage(1))
		const resultAction = await dispatch(fetchSettings())
		if (fetchSettings.fulfilled.match(resultAction)) {
			dispatch(updateSettings(resultAction.payload))
		} else {
			console.error('Failed to fetch settings:', resultAction.error)
		}
	}

	return (
		<div className='aside'>
			<button className='btn-update' onClick={handleUpdateSettings}>
				Обновить
			</button>

			<div className='settings-form'>
				<div className='form-group'>
					<label>Шаблон (макет):</label>
					<input
						type='text'
						value={
							settings.layout.current === 'grid' ? 'Сетка' : 'Плиточная верстка'
						}
						readOnly
					/>
				</div>

				<div className='form-group'>
					<label>Карточка:</label>
					<input
						type='text'
						value={
							settings.template === 'Classic' ? 'Классическая' : 'Наведения'
						}
						readOnly
					/>
				</div>

				<div className='form-group'>
					<label>Навигация:</label>
					<input
						type='text'
						value={
							settings.navigation === 'pagination'
								? 'Пагинация'
								: 'Кнопка "Загрузить больше"'
						}
						readOnly
					/>
				</div>

				<div className='form-group'>
					<label>Колонок:</label>
					<input
						type='text'
						value={
							settings.layout.current === 'grid'
								? settings.layout.params.grid.columns
								: settings.layout.params.masonry.columns
						}
						readOnly
					/>
				</div>

				<div className='form-group'>
					<label>Рядов:</label>
					<input
						type='text'
						value={
							settings.layout.current === 'grid'
								? settings.layout.params.grid.rows
								: settings.layout.params.masonry.rows
						}
						readOnly
					/>
				</div>
			</div>
		</div>
	)
}

export default Aside

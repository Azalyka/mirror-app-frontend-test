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
			<button onClick={handleUpdateSettings}>Обновить</button>
			<pre>{JSON.stringify(settings, null, 2)}</pre>
		</div>
	)
}

export default Aside

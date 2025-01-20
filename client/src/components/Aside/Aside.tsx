import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/rootState'
import { updateSettings } from '../../redux/slices/settingsSlice'
import { fetchSettings } from '../../utils/api'

const Aside: React.FC = () => {
	const dispatch = useDispatch()
	const settings = useSelector((state: RootState) => state.settings)

	const handleUpdateSettings = async () => {
		const newSettings = await fetchSettings()
		dispatch(updateSettings(newSettings))
	}

	return (
		<div className='settings-panel'>
			<h2>Текущие настройки</h2>
			<pre>{JSON.stringify(settings, null, 2)}</pre>
			<button onClick={handleUpdateSettings}>Обновить настройки</button>
		</div>
	)
}

export default Aside

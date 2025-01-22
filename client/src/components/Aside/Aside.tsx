import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/rootState'
import { updateSettings } from '../../redux/slices/settingsSlice'
import { fetchSettings } from '../../utils/api'
import './Aside.css'

const Aside: React.FC = () => {
	const dispatch = useDispatch()
	const settings = useSelector((state: RootState) => state.settings)

	const handleUpdateSettings = async () => {
		const newSettings = await fetchSettings()
		dispatch(updateSettings(newSettings))
	}

	return (
		<div className='aside'>
			<button onClick={handleUpdateSettings}>Обновить</button>
			<pre>{JSON.stringify(settings, null, 2)}</pre>
		</div>
	)
}

export default Aside

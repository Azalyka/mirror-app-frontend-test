import 'normalize.css'
import Aside from './components/Aside/Aside'
import PostList from './components/PostList/PostList'
import './index.css'

function App() {
	return (
		<div className='app'>
			<Aside />
			<PostList />
		</div>
	)
}

export default App

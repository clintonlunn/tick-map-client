import './App.css'
// import 'leaflet/dist/leaflet.css'
import ClimbMap from './components/shared/ClimbMap'
// import Navbar from './components/layout/Navbar'
// import Filters from './components/layout/Filters'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
} from 'react-router-dom'
import NameSearch from './components/layout/NameSearch'

function Layout() {
  const { username } = useParams()
  return (
    <div className='relative h-screen w-full flex'>
      {/* <Navbar /> */}
      <ClimbMap username={username} />
      {/* <Filters /> */}
      <NameSearch />
    </div>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout />} />
        <Route path='/:username' element={<Layout />} />
      </Routes>
    </Router>
  )
}

export default App

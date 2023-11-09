import './App.css'
// import 'leaflet/dist/leaflet.css'
import ClimbMap from './components/shared/ClimbMap'
// import Navbar from './components/layout/Navbar'
// import Filters from './components/layout/Filters'
import NameSearch from './components/layout/NameSearch'

function App() {
  return (
    <div className='relative h-screen w-full flex'>
      {/* <Navbar /> */}
      <ClimbMap />
      {/* <Filters /> */}
      <NameSearch />
    </div>
  )
}

export default App

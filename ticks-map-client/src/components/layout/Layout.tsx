import { useParams } from 'react-router-dom'
import ClimbMap from '../shared/ClimbMap'
import Sidebar from './Sidebar'

// layout for the main page
function Layout() {
  const { username } = useParams()
  return (
    <div className='relative h-screen w-full flex'>
      <ClimbMap username={username} />
      <Sidebar />
    </div>
  )
}

export default Layout

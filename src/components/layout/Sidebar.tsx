import { useState } from 'react'
import { getClimbsByUsername } from '../../services/climbService'
import { Climb } from '../../types/climbs'
import { useNavigate } from 'react-router-dom'
import UsernameDropdown from '../shared/UsernameDropdown'
import ImportFromOpenBeta from '../shared/ImportFromOpenBeta'
import DataResults from '../shared/DataResults'

function Sidebar() {
  const [username, setUsername] = useState('')
  const [data, setData] = useState<Climb[]>([])
  const navigate = useNavigate()

  const handleUsernameSelection = async (username: string) => {
    const climbs = await getClimbsByUsername(username)
    if (!climbs) {
      setData([])
      return
    }
    setUsername(username)
    setData(climbs)
    navigate(`/${username}`)
  }

  return (
    <div className='top-16 right-4 p-4 bg-white h-screen overflow-auto'>
      <UsernameDropdown
        activeUsername={username}
        setSelectedUsername={setUsername}
        handleUsernameSelection={handleUsernameSelection}
      />

      <ImportFromOpenBeta setUsername={setUsername} />
      <DataResults data={data} />
    </div>
  )
}

export default Sidebar

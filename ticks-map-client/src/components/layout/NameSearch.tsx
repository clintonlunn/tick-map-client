import { useState } from 'react'
import {
  getClimbsByUsername,
  importOpenbetaClimbsByUsername,
} from '../../services/climbService'
import { Climb } from '../../types/climbs'
import { useNavigate } from 'react-router-dom'

const NameSearch = () => {
  const [username, setUsername] = useState('')
  const [data, setData] = useState([])
  const [hasSearched, setHasSearched] = useState(false)
  const navigate = useNavigate()
  const renderResults = username !== '' && hasSearched

  const handleNameSearchSubmit = async () => {
    setHasSearched(true)
    const climbs = await getClimbsByUsername(username)

    if (!climbs) {
      setData([])
      return
    }
    setData(climbs)
    navigate(`/${username}`)
  }

  const handleImportFromOpenbeta = async () => {
    // query openbeta for the user's climbs and save them to the db
    await importOpenbetaClimbsByUsername(username)
    // then navigate to the user's page (which will then query the db for the user's climbs and display them)
    navigate(`/${username}`)
  }

  return (
    <div className='top-16 right-4 p-4 bg-white'>
      <h1 className='text-xl'>Search by name</h1>
      <div className='flex flex-col'>
        <input
          type='text'
          placeholder='Enter your name'
          className='p-2 rounded-md border w-full'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button
          className='mt-2 bg-blue-600 text-white p-2 rounded-md w-full'
          onClick={handleNameSearchSubmit}
        >
          Submit
        </button>
      </div>
      {/* if empty results */}
      {renderResults && data.length === 0 && (
        <>
          <p>No results found</p>
          <p>Would you like to import your data from OpenBeta?</p>
          <button onClick={handleImportFromOpenbeta}>Yes</button>
        </>
      )}
      {/* results */}
      {data.length > 0 && (
        <>
          <p>Results:</p>
          <div>
            {data.map((climb: Climb) => {
              return (
                <div key={climb._id}>
                  <p>
                    {climb.name} {climb.grade} {climb.attempt_type}
                    {climb.date_climbed}
                    {climb.date_climbed}
                  </p>
                </div>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}

export default NameSearch

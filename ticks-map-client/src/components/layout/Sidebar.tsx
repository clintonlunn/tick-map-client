import { useState } from 'react'
import {
  getClimbsByUsername,
  importOpenbetaClimbsByUsername,
} from '../../services/climbService'
import { Climb } from '../../types/climbs'
import { useNavigate } from 'react-router-dom'
import UsernameDropdown from '../shared/UsernameDropdown'

function Sidebar() {
  const [username, setUsername] = useState('')
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const navigate = useNavigate()
  const renderResults = username !== '' && hasSearched
  const [noResults, setNoResults] = useState(false)
  const [errorMessage, setErrorMessage] = useState('No results found')

  const handleNameSearchSubmit = async () => {
    setHasSearched(true)
    const climbs = await getClimbsByUsername(username)

    if (!climbs) {
      setNoResults(true)
      setErrorMessage(
        'No results found in database. Please import from OpenBeta first'
      )
      setData([])
      return
    }
    setNoResults(false)
    setErrorMessage('')
    setData(climbs)
    navigate(`/${username}`)
  }

  const handleImportFromOpenbeta = async () => {
    // query openbeta for the user's climbs and save them to the db
    setLoading(true)
    const openBetaData = await importOpenbetaClimbsByUsername(username)
    // then navigate to the user's page (which will then query the db for the user's climbs and display them)
    setLoading(false)
    if (openBetaData === undefined) {
      setNoResults(true)
      setErrorMessage(
        'No results found in OpenBeta, please import data into OpenBeta first'
      )
      navigate('/')
      return
    }
    setNoResults(false)
    setErrorMessage('')
    navigate(`/${username}`)
  }

  const handleUsernameSelection = async (username: string) => {
    const climbs = await getClimbsByUsername(username)
    if (!climbs) {
      setNoResults(true)
      setErrorMessage(
        'No results found in database. Please import from OpenBeta first'
      )
      setData([])
      return
    }
    setUsername(username)
    setHasSearched(false)
    setData(climbs)
    navigate(`/${username}`)
  }

  return (
    <div className='top-16 right-4 p-4 bg-white'>
      <UsernameDropdown
        activeUsername={username}
        setSelectedUsername={setUsername}
        handleUsernameSelection={handleUsernameSelection}
      />

      <h1 className='text-xl'>Search by name</h1>
      <div className='flex flex-col'>
        <input
          type='text'
          placeholder='Enter your name'
          className={`p-2 rounded-md border w-full mt-2 ${
            noResults ? 'border-red-500' : ''
          }`}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        {noResults && <p className='text-red-500'>{errorMessage}</p>}
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
          <div className='mt-4'>
            <p>Would you like to import your data from OpenBeta?</p>
            <button onClick={handleImportFromOpenbeta}>Yes</button>
            {loading && <p>Loading...</p>}
          </div>
        </>
      )}
      {/* results */}
      {data.length > 0 && (
        <>
          <p>Results:</p>
          <div>
            {data.map((climb: Climb, index: number) => {
              return (
                <div key={index}>
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

export default Sidebar

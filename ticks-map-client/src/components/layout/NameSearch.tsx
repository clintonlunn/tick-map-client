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
  const navigate = useNavigate()

  const handleClick = async () => {
    console.log('clicked')

    const climbs = await getClimbsByUsername(username)
    setData(climbs)
    console.log(data)
    console.log(climbs)
    navigate(`/${username}`)

    // submit username to backend so the backend can query openbeta for the user's climbs. it will then save the climbs to the db and return them to the frontend
  }

  const handleFetchOpenbeta = async () => {
    console.log('fetching openbeta')
    // submit username to backend so the backend can query openbeta for the user's climbs. it will then save the climbs to the db and return them to the frontend
    const climbs = await importOpenbetaClimbsByUsername(username)
    setData(climbs)
    navigate(`/${username}`)
  }

  return (
    <div>
      {/* // <div className='absolute top-16 right-4 p-4 bg-white shadow-md rounded-md'> */}
      <div>
        <input
          type='text'
          placeholder='Enter your name'
          className='p-2 rounded-md border w-full'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button
          className='mt-2 bg-blue-600 text-white p-2 rounded-md w-full'
          onClick={handleClick}
        >
          Submit
        </button>
      </div>

      {/* if empty results */}
      {data.length === 0 && (
        <>
          <p>No results found</p>
          <p>Would you like to import your data from OpenBeta?</p>
          <button onClick={handleFetchOpenbeta}>Yes</button>
        </>
      )}

      {/* results */}
      {data.length > 0 && (
        <>
          <p>Results:</p>
          <div>
            {data.map((climb: Climb) => (
              <div key={climb._id}>
                <p>
                  {climb.name} {climb.grade} {climb.attempt_type}
                  {climb.date_climbed}
                  {climb.date_climbed}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default NameSearch

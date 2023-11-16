import { useState } from 'react'
import { importOpenbetaClimbsByUsername } from '../../services/climbService'
import { useNavigate } from 'react-router-dom'

interface ImportFromOpenBetaProps {
  setUsername: React.Dispatch<React.SetStateAction<string>>
}

function ImportFromOpenBeta({ setUsername }: ImportFromOpenBetaProps) {
  const [loading, setLoading] = useState(false)
  const [noResults, setNoResults] = useState(false)
  const [errorMessage, setErrorMessage] = useState('No results found')
  const navigate = useNavigate()
  const [localUsername, setLocalUsername] = useState('')

  const handleImportFromOpenbeta = async () => {
    setLoading(true)
    const openBetaData = await importOpenbetaClimbsByUsername(localUsername)

    setLoading(false)
    if (openBetaData === undefined) {
      setUsername('')
      setNoResults(true)
      setErrorMessage(
        'No results found in OpenBeta, please import data into OpenBeta first'
      )
      navigate('/')
      return
    }
    console.log('ImportFromOpenBeta.tsx: openBetaData', openBetaData)

    setUsername(localUsername)
    setNoResults(false)
    setErrorMessage('')
    navigate(`/${localUsername}`)
  }

  return (
    <div className='flex flex-col mt-4'>
      <h1 className='text-xl'>Import from OpenBeta</h1>
      <input
        type='text'
        placeholder='Enter your OpenBeta username'
        className={`p-2 rounded-md border w-full mt-2 ${
          noResults ? 'border-red-500' : ''
        }`}
        value={localUsername}
        onChange={(e) => setLocalUsername(e.target.value)}
      />
      <button
        className='mt-2 bg-blue-600 text-white p-2 rounded-md w-full'
        onClick={handleImportFromOpenbeta}
      >
        Import from OpenBeta
      </button>
      {loading && <p>Loading...</p>}
      {noResults && <p className='text-red-500'>{errorMessage}</p>}
    </div>
  )
}

export default ImportFromOpenBeta

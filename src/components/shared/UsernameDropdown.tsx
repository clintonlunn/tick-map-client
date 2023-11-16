import { useState } from 'react'
import DropdownButton from '../layout/DropdownButton'
import DropdownMenu from '../layout/DropdownMenu'
import useLoadUsers from '../../hooks/useLoadUsers'

interface UsernameDropdownProps {
  activeUsername: string | undefined
  setSelectedUsername: React.Dispatch<React.SetStateAction<string>>
  handleUsernameSelection: (username: string) => void
}

function UsernameDropdown({
  activeUsername,
  setSelectedUsername,
  handleUsernameSelection,
}: UsernameDropdownProps) {
  const [isActive, setIsActive] = useState(false)
  const usernames = useLoadUsers()

  const handleClick = () => {
    setIsActive(!isActive)
  }

  const handleUsernameClick = (username: string) => {
    setSelectedUsername(username)
    setIsActive(false)
    handleUsernameSelection(username)
  }

  return (
    <div className='relative inline-block text-left'>
      <>
        <h1 className='text-xl'>Select username in Database</h1>
      </>
      <div>
        <DropdownButton onClick={handleClick} username={activeUsername} />
      </div>
      <DropdownMenu
        isActive={isActive}
        usernames={usernames}
        onUsernameClick={handleUsernameClick}
        activeUsername={activeUsername}
      />
    </div>
  )
  return null
}

export default UsernameDropdown

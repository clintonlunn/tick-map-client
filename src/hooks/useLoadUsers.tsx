import { useEffect, useState } from 'react'
import { getAllUsernames } from '../services/userService'

function useLoadUsers() {
  const [users, setUsers] = useState<string[]>([])

  useEffect(() => {
    const loadUsers = async () => {
      const users = await getAllUsernames()
      setUsers(users)
    }
    loadUsers()
  }, [])

  return users
}

export default useLoadUsers

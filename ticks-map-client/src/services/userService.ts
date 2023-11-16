import axios, { AxiosResponse } from 'axios'

const BASE_URL = 'http://localhost:3001/users'

interface User {
  username: string
}

export const getAllUsernames = async (): Promise<string[]> => {
  const response: AxiosResponse<User[]> = await axios.get(BASE_URL)
  const results = response.data

  const uniqueUsernames = [...new Set(results.map((result) => result.username))]
  return uniqueUsernames
}

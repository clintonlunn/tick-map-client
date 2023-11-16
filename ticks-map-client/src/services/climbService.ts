import axios from 'axios'

const BASE_URL = 'http://localhost:3001/internal-climbs'

export const getAllClimbs = async () => {
  const response = await axios.get(BASE_URL)
  return response.data
}

export const getClimbsByUsername = async (username: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/${username}`)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

// query openbeta and add climbs to internal database
export const importOpenbetaClimbsByUsername = async (username: string) => {
  try {
    const response = await axios.get(
      `http://localhost:3001/openbeta-climbs/fetch-from-openbeta/${username}`
    )
    return response.data
  } catch (error) {
    console.log(error)
  }
}

// export const addClimb = async (climbData: Climb) => {
//   const response = await fetch(BASE_URL, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(climbData),
//   })
//   return await response.json()
// }

// import { Climb } from '../types/climbs'

const BASE_URL = 'http://localhost:3001/internal-climbs'

// export const getAllClimbs = async () => {
//   const response = await fetch(BASE_URL)
//   return await response.json()
// }

export const getClimbsByUsername = async (username: string) => {
  const response = await fetch(`${BASE_URL}/${username}`)
  return await response.json()
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

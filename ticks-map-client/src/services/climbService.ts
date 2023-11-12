import axios from 'axios'

const BASE_URL = 'http://localhost:3001/internal-climbs'

export const getAllClimbs = async () => {
  const response = await axios.get(BASE_URL)
  return response.data
}

export const getClimbsByUsername = async (username: string) => {
  // check internal database for climbs by username
  try {
    const response = await axios.get(`${BASE_URL}/${username}`)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

// async function getTicks(username: string): Promise<void> {
//   // regex pattern to validate mountain project input
//   const pattern = /^https:\/\/www.mountainproject.com\/user\/\d{9}\/[a-zA-Z-]*/
//   // get the ticks and add it to the database
//   if (pattern.test(username)) {
//     setLoading(true)

//     try {
//       const response = await fetchMPData(
//         '/api/user/ticks',
//         'POST',
//         JSON.stringify(mpUID)
//       )

//       if (response.ticks[0] !== undefined) {
//         // Add the ticks to the database
//         // Add a delay before rerouting to the new page
//         const ticksCount: number = response.ticks?.length ?? 0

//         setTimeout(() => {
//           // void router.replace(`/u2/${username}`)
//         }, 2000)
//       } else {
//         console.log('No ticks found')
//       }
//     } catch (error) {
//       console.error(error)
//     } finally {
//       setLoading(false)
//     }
//   } else {
//     // handle errors
//     // setErrors(['Please input a valid Mountain Project ID'])
//     // set data to "your username did not find any ticks"
//     console.log('Please input a valid Mountain Project ID')

//   }
//   setLoading(false)
// }

// async function fetchMPData(
//   url: string,
//   method: 'GET' | 'POST' | 'PUT' = 'GET',
//   body?: string
// ): Promise<any> {
//   try {
//     const headers = {
//       'Content-Type': 'application/json',
//     }
//     const config: RequestInit = {
//       method,
//       headers,
//     }

//     if (body !== null && body !== undefined && body !== '') {
//       config.body = JSON.stringify(body)
//     }

//     const response = await fetch(url, config)

//     if (!response.ok) {
//       const errorData = await response.json()
//       throw new Error(errorData.statusText)
//     }

//     return await response.json()
//   } catch (error) {
//     if (error instanceof Error) {
//       console.error('Fetch error:', error.message)
//       throw error
//     }
//     throw new Error('An unexpected error occurred')
//   }
// }

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

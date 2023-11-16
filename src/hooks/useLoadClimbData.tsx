import { useEffect } from 'react'
import { getAllClimbs, getClimbsByUsername } from '../services/climbService'
import { groupClimbsByArea } from '../utils/utils'
import { useNavigate } from 'react-router-dom'
import { Climb } from '../types/climbs'

function useLoadClimbData(
  username: string | undefined,
  setGroupedClimbs: React.Dispatch<React.SetStateAction<Map<string, Climb[]>>>
) {
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchData() {
      let climbData
      if (username) {
        climbData = await getClimbsByUsername(username)
      } else {
        climbData = await getAllClimbs()
      }

      if (!climbData) {
        navigate('/')
        return
      }

      const groupedClimbsObject = groupClimbsByArea(climbData)
      const groupedClimbsMap = new Map(Object.entries(groupedClimbsObject))
      setGroupedClimbs(groupedClimbsMap)
    }

    fetchData()
  }, [username, navigate, setGroupedClimbs])
}

export default useLoadClimbData

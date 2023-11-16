import { Climb } from '../types/climbs'

export function groupClimbsByArea(climbs: Climb[]): { [key: string]: Climb[] } {
  const climbsByArea: { [key: string]: Climb[] } = {}
  climbs.forEach((climb) => {
    // if the area doesn't exist in the object, create a new array with the tick
    if (!climbsByArea[climb.area_name]) {
      climbsByArea[climb.area_name] = [climb]
    } else {
      // if the area does exist in the object, add the tick to the array
      climbsByArea[climb.area_name].push(climb)
    }
  })
  return climbsByArea
}

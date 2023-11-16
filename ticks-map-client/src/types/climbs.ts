export interface Climb {
  id: string
  user_id: string
  name: string
  notes: string
  climb_id: string
  style: string
  attempt_type: string
  date_climbed: number
  grade: string
  source: string
  lat: number
  lng: number
  username: string
  area_name: string
  area_id: string
  bbox: number[]
  mp_id: string
  climb_type: {
    trad: boolean
    sport: boolean
    bouldering: boolean
    deepwatersolo: boolean
    snow: boolean
    ice: boolean
    mixed: boolean
    tr: boolean
    aid: boolean
    alpine: boolean
  }
  path_tokens: string[]
  ancestors: string[]
}

export interface ClimbsByArea {
  [key: string]: Climb[]
}

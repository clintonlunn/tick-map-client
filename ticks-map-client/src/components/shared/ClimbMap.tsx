import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import { getAllClimbs, getClimbsByUsername } from '../../services/climbService'
import { useEffect, useState } from 'react'
import { Climb } from '../../types/climbs'
import 'leaflet/dist/leaflet.css'

interface ClimbMapProps {
  username?: string
}

function ClimbMap({ username }: ClimbMapProps) {
  const [climbs, setClimbs] = useState<Climb[]>([])

  // TODO: eventually swap to getAllClimbs
  useEffect(() => {
    async function fetchData() {
      let climbData = undefined
      if (username !== undefined) {
        climbData = await getClimbsByUsername(username)
      } else {
        climbData = await getAllClimbs()
      }
      console.log(climbData)

      setClimbs(climbData)
    }

    fetchData()
  }, [username])

  return (
    <MapContainer id='mapId' center={[51.505, -0.09]} zoom={13}>
      <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
      {climbs.map((climb) => (
        <Marker key={climb._id} position={[climb.lat, climb.lng]}></Marker>
      ))}
    </MapContainer>
    // <MapContainer
    //   id='mapId'
    //   center={[51.505, -0.09]}
    //   zoom={13}
    //   scrollWheelZoom={false}
    //   className='centered-content'
    // >
    //   <TileLayer
    //     attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    //     url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    //   />
    //   <Marker position={[51.505, -0.09]}>
    //     <Popup>
    //       A pretty CSS3 popup. <br /> Easily customizable.
    //     </Popup>
    //   </Marker>
    // </MapContainer>
  )
}

export default ClimbMap

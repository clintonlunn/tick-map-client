import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import { getClimbsByUsername } from '../../services/climbService'
import { useEffect, useState } from 'react'
import { Climb } from '../../types/climbs'
import 'leaflet/dist/leaflet.css'

function ClimbMap() {
  const [climbs, setClimbs] = useState<Climb[]>([])
  const username = 'clinton'

  useEffect(() => {
    async function fetchData() {
      const data = await getClimbsByUsername(username)
      console.log(data)

      setClimbs(data)
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

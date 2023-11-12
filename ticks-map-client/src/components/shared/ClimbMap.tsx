import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet'
import L from 'leaflet'
import { useNavigate } from 'react-router-dom'
import 'leaflet/dist/leaflet.css'
import { getAllClimbs, getClimbsByUsername } from '../../services/climbService'
import { Climb } from '../../types/climbs'

interface ClimbMapProps {
  username?: string
}

const defaultLat = 0
const defaultLng = 0
const defaultZoom = 13

function SetViewToBounds({ climbs }: { climbs: Climb[] }) {
  const map = useMap()

  useEffect(() => {
    if (climbs.length === 0) {
      map.setView([defaultLat, defaultLng], defaultZoom)
      return
    }

    const bounds = new L.LatLngBounds([])

    climbs.forEach((climb) => {
      bounds.extend(new L.LatLng(climb.lat, climb.lng))
    })

    map.fitBounds(bounds)
  }, [climbs, map])

  return null
}

function ClimbMap({ username }: ClimbMapProps) {
  const [climbs, setClimbs] = useState<Climb[]>([])
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

      setClimbs(climbData)
    }

    fetchData()
  }, [username, navigate])

  return (
    <MapContainer
      id='mapId'
      center={[defaultLat, defaultLng]}
      zoom={defaultZoom}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
      {climbs.map((climb) => (
        <Marker key={climb._id} position={[climb.lat, climb.lng]} />
      ))}
      <SetViewToBounds climbs={climbs} />
    </MapContainer>
  )
}

export default ClimbMap

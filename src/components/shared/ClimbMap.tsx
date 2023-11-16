import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { Climb } from '../../types/climbs'
import CustomPopup from './CustomPopup'
import useLoadClimbData from '../../hooks/useLoadClimbData'

interface ClimbMapProps {
  username?: string
}

interface ClimbMapContentProps {
  groupedClimbs: Map<string, Climb[]>
}

const defaultLat = 0
const defaultLng = 0
const defaultZoom = 13

function ClimbMapContent({ groupedClimbs }: ClimbMapContentProps) {
  const map = useMap()
  const allClimbs = Array.from(groupedClimbs.values()).flat()

  useEffect(() => {
    if (allClimbs.length === 0) {
      map.setView([defaultLat, defaultLng], defaultZoom)
      return
    }

    const bounds = new L.LatLngBounds([])

    allClimbs.forEach((climb) => {
      bounds.extend(new L.LatLng(climb.lat, climb.lng))
    })

    map.fitBounds(bounds)
  }, [allClimbs, map])

  return (
    <>
      <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
      {Array.from(groupedClimbs.entries()).map(([area_name, climbs], index) => {
        const firstClimb = climbs[0]

        return (
          <Marker
            key={`${area_name}-${index}`}
            position={[firstClimb.lat, firstClimb.lng]}
          >
            <CustomPopup area_name={area_name} climbs={climbs} />
          </Marker>
        )
      })}
    </>
  )
}

function ClimbMap({ username }: ClimbMapProps) {
  // load climbs from database
  const groupedClimbs = useLoadClimbData(username)

  return (
    <MapContainer
      center={[defaultLat, defaultLng]}
      zoom={defaultZoom}
      style={{ height: '100%', width: '100%' }}
    >
      <ClimbMapContent groupedClimbs={groupedClimbs} />
    </MapContainer>
  )
}

export default ClimbMap

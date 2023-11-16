import React from 'react'
import { Climb } from '../../types/climbs'
import { Popup } from 'react-leaflet'

interface CustomPopupProps {
  area_name: string
  climbs: Climb[]
}

function CustomPopup({ area_name, climbs }: CustomPopupProps) {
  return (
    <Popup>
      <p>
        Area:{' '}
        <a
          target='_blank'
          href={`https://openbeta.io/crag/${climbs[0].area_id}`}
        >
          {area_name}
        </a>
      </p>
      <ul key={`${climbs[0].area_id}_${climbs[0].climb_id}`}>
        {climbs.map((climb, index) => {
          return (
            // <> </> is a cannot accept a key prop so we use <React.Fragment>
            <React.Fragment key={`${climb.id}_${index}`}>
              <li>
                Climb:{' '}
                <a
                  target='_blank'
                  href={`https://openbeta.io/climbs/${climb.climb_id}`}
                >
                  {climb.name}: {climb.grade}
                </a>
              </li>
            </React.Fragment>
          )
        })}
      </ul>
    </Popup>
  )
}

export default CustomPopup

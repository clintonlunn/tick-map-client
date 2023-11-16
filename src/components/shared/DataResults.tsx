import { Climb } from '../../types/climbs'

interface DataResultsProps {
  data: Climb[]
}

function DataResults({ data }: DataResultsProps) {
  data = data.sort((a, b) => Number(b.date_climbed) - Number(a.date_climbed))
  let currentYear: number | undefined
  return (
    <div className='mt-4'>
      {data.length > 0 && (
        <>
          <p className='font-bold'>Results: {data.length} Climbs Logged</p>
          <div className='mt-4'>
            {data.map((climb: Climb, index: number) => {
              const timestamp = Number(climb.date_climbed)

              if (!climb) {
                return
              }

              const date = new Date(timestamp)
              const year = date.getFullYear()

              const isNewYear = year !== currentYear
              currentYear = year

              return (
                <div key={index}>
                  {isNewYear && (
                    <p className='font-bold mt-4 mb-2'>
                      {year} (
                      {
                        data.filter((climb) => {
                          return (
                            climb.date_climbed &&
                            new Date(
                              Number(climb.date_climbed)
                            ).getFullYear() === year
                          )
                        }).length
                      }{' '}
                      climbs)
                    </p>
                  )}
                  <p>
                    <a
                      href={`https://openbeta.io/climbs/${climb.climb_id}`}
                      className='text-blue-600'
                    >
                      {climb.name}, {climb.grade}, {climb.attempt_type},{' '}
                      {new Date(timestamp).toLocaleDateString('en-US')}
                    </a>
                  </p>
                </div>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}

export default DataResults

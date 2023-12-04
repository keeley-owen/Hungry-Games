import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { AreanFighter } from './ArenaFighter'

interface Coordinates {
  x: number
  y: number
}

interface Results {
  place_id: string
  name: string
  icon_background_color: string
}

const moveSpeed = 1

export default function Arena() {
  const location = useLocation()
  const [coordinates, setCoordinates] = useState<Coordinates[]>([])

  useEffect(() => {
    const coordArray = []

    location.state.results.forEach((element, index: number) => {
      coordArray.push({
        x: Math.cos(index * maxValue) * 400 + 400,
        y: Math.sin(index * maxValue) * 400 + 400,
      })
    })

    setCoordinates(coordArray)

    const token = setInterval(() => {
      setCoordinates((prev) =>
        prev.map((element) => {
          const x = element.x + 1
          const y = element.y + 1
          return { x, y }
        }),
      )
    }, 1000 / 60)

    return () => {
      clearInterval(token)
    }
  }, [])

  const results = location.state.results
  // Now you can use 'results' in your Arena component

  const maxValue: number = (2 * Math.PI) / results.length

  return (
    <div className="arenaContainer">
      <div className="circle"></div>
      {coordinates[0]
        ? results.map((data: Results, index: number) => {
            return (
              <AreanFighter
                data={data}
                x={coordinates[index].x}
                y={coordinates[index].y}
                key={index}
              />
            )
          })
        : ''}
    </div>
  )
}

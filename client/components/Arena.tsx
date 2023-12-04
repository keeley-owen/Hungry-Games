import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { AreanFighter } from './ArenaFighter'

interface Coordinates {
  x: number
  y: number
  yOffset: number
  isDead: boolean
}

interface Results {
  place_id: string
  name: string
  icon_background_color: string
}

const moveSpeed = 1
const indexMoveSpeedEffect = 1.5

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

class RandomNumberGenerator {
  private seed: number

  constructor(seed: number) {
    this.seed = seed
  }

  // Generate a random number between min (inclusive) and max (inclusive)
  public generateRandomNumber(min: number, max: number): number {
    const a = 7052342 // Multiplier
    const c = 2660 // Increment

    const m = Math.pow(2, 32) // Modulus

    // Linear Congruential Generator formula
    this.seed = (a * this.seed + c) % m

    // Scale the generated number to fit within the specified range
    const scaledRandom = min + (this.seed % (max - min + 1))
    return Math.floor(scaledRandom)
  }
}

export default function Arena() {
  const location = useLocation()
  const [coordinates, setCoordinates] = useState<Coordinates[]>([])
  useEffect(() => {
    console.log('UseEffect')

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
        prev.map((element, index) => {
          if (!element.isDead) {
            // Calculate the differences in x and y
            const xDiff = element.x - 400
            const yDiff = element.y - 400

            // Calculate the distance using Pythagorean theorem
            const distance = Math.sqrt(xDiff * xDiff + yDiff * yDiff)

            const jumpHeight = Math.abs(Math.sin(distance * 0.1 + index)) * -10

            const rng = new RandomNumberGenerator(index + location.state.winner)
            const randomVal = rng.generateRandomNumber(
              0,
              location.state.results.length,
            )

            const speedEffect =
              moveSpeed +
              (randomVal / location.state.results.length) * indexMoveSpeedEffect

            // Normalize x and y differentials
            const normalizedXDif = (xDiff / distance) * speedEffect

            const normalizedYDif = (yDiff / distance) * speedEffect

            // Update x and y coordinates
            const x = element.x - normalizedXDif
            const y = element.y - normalizedYDif

            return {
              x,
              y,
              yOffset: jumpHeight,
              isDead:
                Math.random() <= 0.01 && index != location.state.winner
                  ? true
                  : false,
            }
          } else {
            return { x: 0, y: 0, yOffset: 0, isDead: true }
          }
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
                isDead={coordinates[index].isDead}
                data={data}
                x={coordinates[index].x}
                y={coordinates[index].y + coordinates[index].yOffset}
                key={index}
              />
            )
          })
        : ''}
    </div>
  )
}

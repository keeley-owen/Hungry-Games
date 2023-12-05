import { useEffect, useState } from 'react'

interface ArenaFighter {
  x: number
  y: number
  data: Results
  isDead: boolean
}

interface Results {
  place_id: string
  name: string
}

export function ArenaFighter(props: ArenaFighter) {
  const [randomColor, getRandomColor] = useState('red')
  const random = '#' + Math.floor(Math.random() * 0xffffff).toString(16)
  useEffect(() => {
    getRandomColor(random)
  }, [])
  return (
    <div
      style={{
        top: `${props.y}px`,
        left: `${props.x}px`,
        display: `${props.isDead ? 'none' : 'flex'}`,
        backgroundColor: randomColor,
      }}
      key={props.data.place_id}
      className="arenaFighter"
    >
      <b style={{ color: randomColor }} className="inverted">
        {props.data.name}
      </b>
    </div>
  )
}

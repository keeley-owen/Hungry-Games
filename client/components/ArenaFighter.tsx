interface ArenaFighter {
  x: number
  y: number
  data: Results
  isDead: boolean
}

interface Results {
  place_id: string
  name: string
  icon_background_color: string
}

export function ArenaFighter(props: ArenaFighter) {
  const randomColor = '#' + Math.floor(Math.random() * 0xffffff).toString(16)
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
      {props.data.name}
    </div>
  )
}

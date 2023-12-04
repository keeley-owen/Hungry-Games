interface ArenaFighter {
  x: number
  y: number
  data: Results
}

interface Results {
  place_id: string
  name: string
  icon_background_color: string
}

export function AreanFighter(props: ArenaFighter) {
  return (
    <div
      style={{
        top: `${props.y}px`,
        left: `${props.x}px`,
        backgroundColor: props.data.icon_background_color,
      }}
      key={props.data.place_id}
      className="arenaFighter"
    >
      {props.data.name}
    </div>
  )
}
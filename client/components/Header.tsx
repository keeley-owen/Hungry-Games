import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <>
      <Link to="/">
        <h1 className="header"> The Hungry Games</h1>
      </Link>
    </>
  )
}

import Header from './Header'
import { Link } from 'react-router-dom'

function Landing() {
  return (
    <div className="landingPageWrapper">
      <>
        <Link to="/nearby">
          <h1 className="landingPageButtons"> Get restaurants near you!</h1>
        </Link>{' '}
        <Link to="/custom">
          <h1 className="landingPageButtons"> Input your own restaurants!</h1>
        </Link>
      </>
    </div>
  )
}

export default Landing

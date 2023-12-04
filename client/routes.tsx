import App from './components/App'
import Home from './components/Home'
import LocationList from './components/LocationList'
import Arena from './components/Arena'
import Header from './components/Header'

import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
} from 'react-router-dom'
import Details from './components/Details'
import LandingPage from './components/LandingPage'

export const routes = createRoutesFromElements(
  <>
    <Route path="/" element={<LandingPage />}>
      <Route index element={<Home />} />
    </Route>
    <Route path="/nearby" element={<App />} />
    <Route path="/custom" element={<CustomLocations />} />

    <Route path="/arena" element={<Arena />} />
    <Route path="/winner " element={<Details />} />
  </>,
)

export const router = createBrowserRouter(routes)

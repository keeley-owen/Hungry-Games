import App from "./components/App";
import Home from "./components/Home";
import  LocationList  from "./components/LocationList";
import Arena from "./components/Arena";
import Header from "./components/Header";

import { createBrowserRouter, Route, createRoutesFromElements } from 'react-router-dom'

export const routes = createRoutesFromElements(
  
  <>
  <Route path = '/' element = {<App />}>
    <Route index element = {<Home />}/>
  </Route>
  
  <Route path = '/arena' element = { <Arena />}/>
  </>
  

)

export const router = createBrowserRouter(routes)
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App/App.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// import i18n (needs to be bundled ;))
import './i18n';
import Login from './pages/Login.tsx'
import Register from './pages/Register.tsx'
import Admin from './pages/Admin.tsx'
import Contact from './pages/Contact.tsx'
import About from './pages/About.tsx'
import Error404 from './pages/Error404.tsx'
import Feedback from './pages/Feedback.tsx'
import Settings from './pages/Settings.tsx'
import Organization from './pages/Organization.tsx'
import Organizations from './pages/Organizations.tsx'
import Map from './pages/Map.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error404 />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Register />
  },
  {
    path: '/admin',
    element: <Admin />
  },
  {
    path: '/contact',
    element: <Contact />
  },
  {
    path: '/about',
    element: <About />
  },
  {
    path: '/feedback',
    element: <Feedback />
  },
  {
    path: '/settings',
    element: <Settings />
  },
  {
    path: '/organizations',
    element: <Organizations />,
  },
  {
    path: '/organizations/:organizationId',
    element: <Organization />
  },
  {
    path: '/map/:mapId/zoom/:zoom/centerX/:centerX/centerY/:centerY/centerZ/:centerZ/',
    element: <Map />
  },
  {
    path: '/map/:mapId/zoom/:zoom/centerX/:centerX/centerY/:centerY/centerZ/:centerZ/location/:locationId',
    element: <Map />
  },
  {
    path: '/map/:mapId/zoom/:zoom/centerX/:centerX/centerY/:centerY/centerZ/:centerZ/fromLocation/:fromLocationId/toLocation/:toLocationId',
    element: <Map />
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
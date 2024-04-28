import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './pages/App/App.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from "react-redux";
import store from "./store/store"; // Подключение вашего Redux store

// import i18n (needs to be bundled ;))
import './i18n.ts';
import Login from './pages/Desktop/Login.tsx'
import Register from './pages/Desktop/Register.tsx'
import Admin from './pages/Desktop/Admin.tsx'
import Contact from './pages/Desktop/Contact.tsx'
import Error404 from './pages/Desktop/Error404.tsx'
import Feedback from './pages/Desktop/Feedback.tsx'
import Settings from './pages/Desktop/Settings.tsx'
import Organization from './pages/Desktop/Organization.tsx'
import Organizations from './pages/Desktop/Organizations.tsx'
import Map from './pages/Desktop/Map.tsx'
import Landing from './pages/Desktop/Landing.tsx'
import MapMobile from './pages/Mobile/Map.tsx'
import HelloMobile from './pages/Mobile/Hello.tsx'
import TestComponent from './pages/Mobile/Test.tsx'

const router = createBrowserRouter([
  {
    path: 'mobile/hello',
    element: <HelloMobile />
  },
  {
    path: 'mobile/map',
    element: <MapMobile />
  },
  {
    path: 'mobile/test',
    element: <TestComponent />
  },
  {
    path: '/app',
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
    path: '/',
    element: <Landing />
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
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
)
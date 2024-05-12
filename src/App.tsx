import { BrowserRouter, Route, createBrowserRouter, RouterProvider } from 'react-router-dom'

//import {App as AppPage} from './pages/App/App.tsx'
import Map from './pages/Desktop/Map.tsx'
import Landing from './pages/Desktop/Landing.tsx'
import MapMobile from './pages/Mobile/Map.tsx'
import HelloMobile from './pages/Mobile/Hello.tsx'
import TestComponent from './pages/Mobile/Test.tsx'
import Test2Component from './pages/Mobile/Test2.tsx'
import SignIn from './pages/Mobile/SignIn.tsx'
import SignUp from './pages/Mobile/SignUp.tsx'
import Error404 from './pages/Mobile/Error404.tsx'


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
        path: 'mobile/signin',
        element: <SignIn />
    },
    {
        path: 'mobile/signup',
        element: <SignUp />
    },
    {
      path: 'mobile/test',
      element: <TestComponent />
    },
    {
        path: 'mobile/test2',
        element: <Test2Component />
    },
    {
      path: '*',
      element: <Error404 />,
    },
    {
      path: '/',
      element: <Landing />
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

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
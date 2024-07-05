import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Root, RootLoader } from './views/root'
import { Login, LoginLoader } from './views/login'
import Tickets from './views/tickets'


function App() {
  const router = createBrowserRouter([
    {
      path: '/login',
      loader: LoginLoader,
      element: <Login />
    },
    {
      path: '/',
      element: <Root />,
      loader: RootLoader,
      children: [
        {
          path: 'tickets',
          element: <Tickets />
        }
      ]
    }
  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App

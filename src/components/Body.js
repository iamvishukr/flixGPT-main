import Login from './Login';
import Browse from './Browse';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Aboutus from './Aboutus';

const Body = () => {    
    const appRouter = createBrowserRouter([
        {
            path: '/',
            element: <Login/>
        },
        {
            path: '/browse',
            element: <Browse/>
        },
        {
            path: '/about',
            element: <Aboutus/>
        },
        
        

    ])

  return (
    <div >
        <RouterProvider router={appRouter}/>
    </div>
    
  )
}

export default Body;
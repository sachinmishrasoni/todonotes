import './App.css';
// import UserSelectOption from './Components/Pages/UserSignIn/UserSelectOption';
import {RouterProvider, createBrowserRouter} from 'react-router-dom'
import TodosApp from './Components/Pages/TodosApp/TodosApp';
import NotesApp from './Components/Pages/NotesApp/NotesApp';
import AppSnackBar from './Components/GobalCompo/AppSnackBar';
import Layout from './Components/Pages/Layouts/Layout';

function App() {


  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: '',
          element: <TodosApp />
        },
        {
          path: 'notes',
          element: <NotesApp />
        }
      ]
    }
  ])

  return (
    <>  
      <RouterProvider router={router}/>
      {/* <AppLayout /> */}
      {/* <UserSelectOption /> */}
      <AppSnackBar />
    </>
  )
}

export default App

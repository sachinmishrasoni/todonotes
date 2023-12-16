import React,{lazy, Suspense} from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import AppThemeProvider from './AppContext/AppThemeProvider.tsx'
import AppDataProvider from './AppContext/AppDataProvider.tsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import TodosApp from './Components/Pages/TodosApp/TodosApp.tsx'
// import NotesApp from './Components/Pages/NotesApp/NotesApp.tsx'
const LayoutLazy = lazy(() => import('./Components/Pages/Layouts/Layout.tsx'))
// import Layout from './Components/Pages/Layouts/Layout.tsx'
import NoteViewIdCheck from './Components/Pages/NotesApp/NoteView/NoteViewIdCheck.tsx'
import ProtectedNotesApp from './Components/Pages/NotesApp/ProtectNotesApp/ProtectedNotesApp.tsx'
import CreateOrForgetPassCode from './Components/Pages/NotesApp/ProtectNotesApp/CreateOrForgetPassCode.tsx'
import LoadingPage from './Components/Pages/LoadingCompo/LoadingPage.tsx'


const router = createBrowserRouter([
  {
    path: "/todonotes",
    element: <Suspense fallback={<LoadingPage />}><LayoutLazy /></Suspense>,
    children: [
      {
        path: '/todonotes',
        element: <TodosApp />
      },
      {
        path: '/todonotes/notes',
        element: <ProtectedNotesApp  />
      },
      {
        path: '/todonotes/notes/:noteId',
        element: <NoteViewIdCheck />
      },
      {
        path: '/todonotes/notes/createpasscode',
        element: <CreateOrForgetPassCode />
      },
      {
        path: '/todonotes/notes/forgetpasscode',
        element: <CreateOrForgetPassCode />
      }
    ]
  }
]);

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path='/' element={<Layout />} >
//       <Route path='' element={<TodosApp />} />
//       <Route path='/notes' element={<NotesApp />} />
//     </Route>
//   )
// )

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppThemeProvider>
      <AppDataProvider>
        <RouterProvider router={router} />
      </AppDataProvider>
    </AppThemeProvider>
  </React.StrictMode>,
)

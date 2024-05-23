import Login from './pages/Login'
import Register from './pages/Register'
import NotFound from './pages/NotFound'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoutes'
import HomePage from './pages/HomePage'
import MainLayout from './layouts/MainLayout'
import CourseLayout from './layouts/CourseLayout'
import CoursePage from './pages/CoursePage'
import AddPrograms from './components/AddPrograms'
import EditCoursePage from './pages/EditCoursePage'
import PoForm from './components/PoForm'
import PsoForm from './components/PsoForm'
import PoUpdateForm from './components/PoUpdateForm'
import PsoUpdateForm from './components/PsoUpdateForm'
import AddSyllabus from './components/AddSyllabus'
import SyllabusDetail from './components/SyllabusDetail'
import AboutPage from './pages/AboutPage'
import AddSemester from './components/AddSemester'
import EditSemester from './components/EditSemester'
import AddSubject from  './components/AddSubject'
import SubjectPage from './pages/SubjectPage'
import AddCourseOutcome from './components/AddCourseOutcome'
import EditCourseOutcome from './components/EditCourseOutcome'
import AddCourseContent from './components/AddCourseContent'
import EditCourseContent from './components/EditCourseContent'
import AddTextBookReference from './components/AddTextBookReference'
import EditTextBookReference from './components/EditTextBookReference'
import AddReferenceBook from './components/AddReferenceBook'
import EditReferenceBook from './components/EditReferenceBook'
import AddWebReference from './components/AddWebReference'
import EditWebReference from './components/EditWebReference'
import AddOnlineReference from './components/AddOnlineReference'
import EditOnlineReference from './components/EditOnlineReference'
import EditSyllabus from './components/EditSyllabus'
import EditSubject from './components/EditSubject'
import AddCourseObjective from './components/AddCourseObjective'
import EditCourseObjective from './components/EditCourseObjective'
import AddLabComponent from './components/AddLabComponent'
import EditLabComponent from './components/EditLabComponent'
import { useState, useEffect } from 'react'
import api from './api'

const Logout = () => {
  localStorage.clear()
  return <Navigate to="/login" />
}

const RegisterAndLogout = () => {
  localStorage.clear()
  return <Register />
}

function App() {
  const [isSuperUser, setIsSuperuser] = useState(false)

  useEffect(()=>{
    getSuperUser()
  }, [])

  const getSuperUser = () => {
    api.get(`/api/check_superuser/`). 
    then((res)=> setIsSuperuser(res.data.is_superuser)). 
    catch((err)=> console.error(err))
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route path='/about' element={<AboutPage />} />
          <Route index element={<ProtectedRoute> <HomePage /> </ProtectedRoute>} />
          <Route path='/courses' element={<ProtectedRoute> <CourseLayout/> </ProtectedRoute>} />
          <Route path='/courses/:id' element={<ProtectedRoute> <CoursePage /> </ProtectedRoute>} />
          <Route path='/syllabus/:id' element={<ProtectedRoute> <SyllabusDetail /> </ProtectedRoute>} />
          <Route path='/syllabus/:sid/subject/:id' element={<ProtectedRoute> <SubjectPage /> </ProtectedRoute>} />
          <Route path='/subject/:id' element={<ProtectedRoute> <SubjectPage /> </ProtectedRoute>} />

       {isSuperUser &&
       <>
       {/* Add Routes */}
          <Route path='/add-course' element={ <ProtectedRoute> <AddPrograms /> </ProtectedRoute>} />
          <Route path='/add-po/:id' element={ <ProtectedRoute> <PoForm /> </ProtectedRoute>} />
          <Route path='/add-pso/:id' element={ <ProtectedRoute> <PsoForm /> </ProtectedRoute>} />
          <Route path='/add-syllabus/:id' element={<ProtectedRoute> <AddSyllabus /> </ProtectedRoute>} />
          <Route path='/add-semester/:sid/:cid' element={<ProtectedRoute> <AddSemester /> </ProtectedRoute>} />
          <Route path='/add-subject/:id' element={<ProtectedRoute> <AddSubject /> </ProtectedRoute>} />
          <Route path='/add-course-outcome/:id' element={<ProtectedRoute> <AddCourseOutcome /> </ProtectedRoute>} />
          <Route path='/syllabus/:sid/subject/:ssid/add-course-outcome/:id' element={<ProtectedRoute> <AddCourseOutcome /> </ProtectedRoute>} />
          <Route path='/subject/:ssid/add-course-outcome/:id' element={<ProtectedRoute> <AddCourseOutcome /> </ProtectedRoute>} />
          <Route path='/add-course-objective/:id' element={<ProtectedRoute> <AddCourseObjective /> </ProtectedRoute>} />
          <Route path='/add-course-content/:id' element={<ProtectedRoute> <AddCourseContent /> </ProtectedRoute>} />
          <Route path='/add-text-book/:id' element={<ProtectedRoute> <AddTextBookReference /> </ProtectedRoute>} />
          <Route path='/add-reference-book/:id' element={<ProtectedRoute> <AddReferenceBook /> </ProtectedRoute>} />
          <Route path='/add-web-reference/:id' element={<ProtectedRoute> <AddWebReference /> </ProtectedRoute>} />
          <Route path='/add-online-reference/:id' element={<ProtectedRoute> <AddOnlineReference /> </ProtectedRoute>} />
          <Route path='/add-lab-component/:id' element={<ProtectedRoute> <AddLabComponent /> </ProtectedRoute>} />

          {/* Edit Routes */}
          <Route path='/courses/edit/:id' element={ <ProtectedRoute> <EditCoursePage /> </ProtectedRoute>} />
          <Route path='/edit-po/:id' element={ <ProtectedRoute> <PoUpdateForm /> </ProtectedRoute>} />
          <Route path='/edit-pso/:id' element={ <ProtectedRoute> <PsoUpdateForm /> </ProtectedRoute>} />
          <Route path='/edit-syllabus/:id' element={<ProtectedRoute> <EditSyllabus /> </ProtectedRoute>} />
          <Route path='/edit-semester/:id' element={<ProtectedRoute> <EditSemester /> </ProtectedRoute>} />
          <Route path='/edit-subject/:id' element={<ProtectedRoute> <EditSubject /> </ProtectedRoute>} />
          <Route path='/edit-course-outcome/:id' element={<ProtectedRoute> <EditCourseOutcome /> </ProtectedRoute>} />
          <Route path='/edit-course-objective/:id' element={<ProtectedRoute> <EditCourseObjective /> </ProtectedRoute>} />
          <Route path='/edit-course-content/:id' element={<ProtectedRoute> <EditCourseContent /> </ProtectedRoute>} />
          <Route path='/edit-text-book/:id' element={<ProtectedRoute> <EditTextBookReference /> </ProtectedRoute>} />
          <Route path='/edit-reference-book/:id' element={<ProtectedRoute> <EditReferenceBook /> </ProtectedRoute>} />
          <Route path='/edit-web-reference/:id' element={<ProtectedRoute> <EditWebReference /> </ProtectedRoute>} />
          <Route path='/edit-online-reference/:id' element={<ProtectedRoute> <EditOnlineReference /> </ProtectedRoute>} />
          <Route path='/edit-lab-component/:id' element={<ProtectedRoute> <EditLabComponent /> </ProtectedRoute>} /> 
          </>
          }
        </Route>

        <Route path='/login' element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path='/register' element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

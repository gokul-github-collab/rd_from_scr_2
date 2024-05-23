import React, { useEffect, useState } from 'react'
import api from '../api'
import CourseItem from './CourseItem'
const CourseList = ({ isHome = false }) => {
  const [courses, setCourses] = useState([])
  const [superUser, setSuperUser] = useState(false)

  useEffect(() => {
    check_superuser(),
      getCourse()
  }, [])

  const getCourse = () => {
    api.get('/api/courses/')
      .then((res) => res.data)
      .then((data) => {
        if (isHome) {
          const limitedCourses = Array.isArray(data) ? data.slice(0, 3) : data;
          setCourses(limitedCourses);
        } else {
          setCourses(data);
        }
      })
      .catch((err) => alert(err));
  };


  const check_superuser = () => {
    api.get('/api/check_superuser/').
      then((res) => {
        setSuperUser(res.data.is_superuser)
      }).catch((err) => alert(err))
  }
  return (

    <section className="px-4 py-10 bg-gray-100">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {courses.map((course) => (
            <CourseItem key={course.id} course={course} />
          ))}
        </div>
      </div>
    </section>

  )
}

export default CourseList
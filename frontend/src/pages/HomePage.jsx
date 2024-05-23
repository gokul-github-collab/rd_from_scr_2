import React, { useEffect, useState } from 'react'
import api from '../api'
import { Link } from 'react-router-dom'
import HomeCards from '../components/HomeCards.jsx'
import ViewAllPrograms from '../components/ViewAllPrograms.jsx'
import CourseList from '../components/CourseList.jsx'

const HomePage = () => {
  const [superUser, setSuperUser] = useState(false)
    
  useEffect(()=>{
    checkSuperUser()
  }, [])

  const checkSuperUser = () => {
    api.get("/api/check_superuser/")
      .then((res)=> {
        setSuperUser(res.data.is_superuser)
      }).catch((err) => alert(err))
  }

  return (
    <div className="bg-white">
      <div className="relative isolate px-6   bg-gray-100">
        <div className="mx-auto max-w-1xl py-32 sm:py-48 lg:py-36">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
          </div>

          <main>
            <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">

              <div className="text-center">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                  Discover SKACAS's programs
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  Discover our diverse programs tailored for your success at SKACAS
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                  <Link
                      to="/courses"
                      className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Courses
                  </Link>
                  <Link to="/about" className="text-sm font-semibold leading-6 text-gray-900">
                    Learn more <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>


            </div>
          </main>

        </div>

        <HomeCards/>
        <CourseList isHome={true}/>
        <ViewAllPrograms/>
      </div>
    </div>
  )
}

export default HomePage

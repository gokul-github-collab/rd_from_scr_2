import React from 'react'
import { Link } from 'react-router-dom'
const ViewAllCourses = () => {
  return (
    <section className="m-auto max-w-lg my-10 px-6">
      <Link
        to="/courses"
        className="block bg-gradient-to-tr from-indigo-100 to-indigo-400 hover:from-pink-300 hover:to-yellow-300 ... text-center py-4 px-6 rounded-xl"
      >View All Programs
      </Link>
    </section>
  )
}

export default ViewAllCourses
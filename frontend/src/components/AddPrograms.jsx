import React from 'react'
import { useState, useEffect } from 'react'
import api from '../api'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import NotFound from '../pages/NotFound'


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}



const AddPrograms = () => {
  const [isSuperUser, setIsSuperuser] = useState(false)

  const [agreed, setAgreed] = useState(false)

  useEffect(() => {
    checkSuperuser()
  }, [])


  const [course, setCourse] = useState([])
  const [name, setName] = useState("")
  const [type, setType] = useState("")
  const [description, setDescription] = useState("")
  const [location, setLocation] = useState("")
  // const [tuition_fee, setTuitionFee] = useState("")


  const navigate = useNavigate()

  const checkSuperuser = () => {
    api.get("/api/check_superuser/")
      .then((res) => {
        console.log("Response from check_superuser:", res);
        setIsSuperuser(res.data.is_superuser);
      })
      .catch((err) => {
        console.error("Error checking superuser:", err);
      });
  };

  const getCourse = () => {
    api.get("/api/courses/").
      then((res) => res.data).
      then((data) => setCourse(data)).
      catch(err => alert(err))
  }

  const createCourse = (e) => {
    e.preventDefault()
    api.post("/api/courses/", { name, type, description, location }).
      then((res) => {
        if (res.status === 201) { toast.success("Course Created Successfully"); navigate(`/courses`) }
        else toast.error("Course haven't created")
      }).catch((err) => toast.error(err))
    getCourse()
  }

  return (
    <>


      {isSuperUser ?

        <div className="isolate px-6 py-24 sm:py-32 lg:px-8 bg-gray-100">

          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-indigo-600 sm:text-4xl">Add Course</h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              Aute magna irure deserunt veniam aliqua magna enim voluptate.
            </p>
          </div>
          <form onSubmit={createCourse} className="mx-auto mt-16 max-w-xl sm:mt-20">
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">

              <div className="sm:col-span-2">
                <label htmlFor="name" className="block text-sm font-semibold leading-6 text-gray-900">
                  Course Name
                </label>
                <div className="mt-2.5">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="type" className="block text-sm font-semibold leading-6 text-gray-900">
                  Course Type
                </label>
                <div className="mt-2.5">
                  <input
                    type="text"
                    name="type"
                    id="type"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="location" className="block text-sm font-semibold leading-6 text-gray-900">
                  Course Location
                </label>
                <div className="mt-2.5">
                  <input
                    type="text"
                    name="location"
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

             
              <div className="sm:col-span-2">
                <label htmlFor="description" className="block text-sm font-semibold leading-6 text-gray-900">
                  Description
                </label>
                <div className="mt-2.5">
                  <textarea
                    name="description"
                    id="description"
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

                  />
                </div>
              </div>
            </div>
            <div className="mt-10">
              <button
                type="submit"
                className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Submit
              </button>
            </div>
          </form>
        </div> : <NotFound />

      }



    </>

  )
}

export default AddPrograms










// <form className="space-y-6 mt-36" onSubmit={createCourse}>
// <div>
//   <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
//     Course Name
//   </label>
//   <div className="mt-2">
//     <input
//       id="name"
//       name="name"
//       type="text"
//       value={name}
//         onChange={(e) => setName(e.target.value)}
//       required
//       className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//     />
//   </div>
// </div>
// <div>
//   <label htmlFor="type" className="block text-sm font-medium leading-6 text-gray-900">
//     Course Type
//   </label>
//   <div className="mt-2">
//     <input
//       id="type"
//       name="type"
//       type="text"
//       value={type}
//       onChange={(e) => setType(e.target.value)}
//       required
//       className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//     />
//   </div>
// </div>
// <div>
//   <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
//     Course Description
//   </label>
//   <div className="mt-2">
//     <input
//       id="description"
//       name="description"
//       value={description}
//       onChange={(e) => setDescription(e.target.value)}
//       type="text"
//       required
//       className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//     />
//   </div>
// </div>
// <div>
//   <label htmlFor="location" className="block text-sm font-medium leading-6 text-gray-900">
//     Course Location
//   </label>
//   <div className="mt-2">
//     <input
//       id="location"
//       name="location"
//       type="text"
//       value={location}
//       onChange={(e) => setLocation(e.target.value)}
//       required
//       className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//     />
//   </div>
// </div>
// <div>
//   <label htmlFor="tuition_fee" className="block text-sm font-medium leading-6 text-gray-900">
//     Course Tuition Fee
//   </label>
//   <div className="mt-2">
//     <input
//       id="tuition_fee"
//       name="tuition_fee"
//       type="text"
//       value={tuition_fee}
//       onChange={(e) => setTuitionFee(e.target.value)}
//       required
//       className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//     />
//   </div>
// </div>



// <div>
//   <button
//     type="submit"
//     className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//   >
//     Add Course
//   </button>
// </div>
// </form>
import { useEffect, useState } from 'react'
import api from '../api'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import DeleteCourseOutcome from './DeleteCourseOutcome'
import DeleteCourseContent from './DeleteCourseContent'
import DeleteTextBookReference from './DeleteTextBookReference'
import DeleteReferenceBook from './DeleteReferenceBook'
import DeleteWebReference from './DeleteWebReference'
import DeleteOnlineReference from './DeleteOnlineReference'
import { PDFDownloadLink } from '@react-pdf/renderer';
import SubjectDetailPDF from './SubjectDetailPDF';


import { Fragment } from 'react'
import {
  BriefcaseIcon,
  CalendarIcon,
  CheckIcon,
  ChevronDownIcon,
  CurrencyDollarIcon,
  LinkIcon,
  MapPinIcon,
  PencilIcon,
} from '@heroicons/react/20/solid'
import { HiMiniPlusCircle } from "react-icons/hi2";
import { Menu, Transition } from '@headlessui/react'
import DeleteCourseObjective from './DeleteCourseObjective'
import DeleteLabComponent from './DeleteLabComponent'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function SubjectDetail() {
  const { id } = useParams()

  useEffect(() => {
    checkSuperuser()
    getSubject(id)
  }, [id])

  const navigate = useNavigate()



  const [subject, setSubject] = useState(null)
const [syllabus, setSyllabus] = useState(null)
const [semester, setSemester] = useState(null)

  const [isSuperuser, setIsSuperuser] = useState(false)

  const checkSuperuser = () => {
    api.get(`/api/check_superuser/`).
      then((res) => setIsSuperuser(res.data.is_superuser)).
      catch((err) => toast.error(err))
  }

  const handleDeleteSubject = () => {
    console.log(subject ? subject.id : "")
    if (window.confirm(`Are you sure you want to delete ${subject ? subject.name : ""}`)) {
      try {
        api.delete(`/api/subject/delete/${subject ? subject.id : ""}/`)
        toast.error('Subject deleted successfully')
        navigate(`/syllabus/${syllabus? syllabus.id: ""}`);
      } catch (err) {
        alert(err)
      }

    }
  }

  const getSubject = (id) => {
    api.get(`/api/subject/${id}/`).
      then((res) =>{ setSubject(res.data); getSemester(res.data.semester)}).
      catch(err => toast.error(err))
  }
  const getSemester = (id) => {
    api.get(`/api/semester/${id}/`).
      then((res) =>{ setSemester(res.data); getSyllabus(res.data.syllabus)}).
      catch(err => toast.error(err))
  }

  const getSyllabus = (id) => {
    api.get(`/api/syllabus/${id}/`).
      then((res) => setSyllabus(res.data)).
      catch(err => toast.error(err))
  }
  return (
    <div className='bg-gray-200 lg:px-64 '>

      <div className=" border-t border-black-200">
        <dl className="divide-y divide-black-200">

          {/* */}

          <div className="lg:flex lg:items-center lg:justify-between py-5">
            <div className="min-w-0 flex-1 px-4">
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                {subject ? subject.name : ""}
              </h2>
              <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
                <div className="mt-2 flex items-center text-sm text-gray-600">
                  <BriefcaseIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-500" aria-hidden="true"/>
                  Course Code: {subject ? subject.course_code : ""}
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-600">
                  <CalendarIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-500" aria-hidden="true"/>
                  Lecture Tutorial Practical Course: {subject ? subject.ltpc : ""}
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-600">
                  <CalendarIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-500" aria-hidden="true"/>
                  Prerequisite: {subject ? subject.prerequisite : ""}
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-600">
                  <CalendarIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-500" aria-hidden="true"/>
                  External Mark: {subject ? subject.external_mark : ""}
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-600">
                  <CalendarIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-500" aria-hidden="true"/>
                  Internal Mark: {subject ? subject.internal_mark : ""}
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-600">
                  <CalendarIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-500" aria-hidden="true"/>
                  Subject Type: {subject ? subject.t_or_p : ""}
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-600">
                  <CalendarIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-500" aria-hidden="true"/>
                  Semester: {subject ? subject.semester : ""}
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-600">
                  <CalendarIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-500" aria-hidden="true"/>
                  Syllabus Year: {syllabus ? syllabus.year : ""}
                </div>
              </div>
            </div>
            {isSuperuser &&

                <div className="mt-5 flex lg:ml-4 lg:mt-0">
                <span className="hidden sm:block">
                  <Link
                      to={`/edit-subject/${subject ? subject.id : ""}`}
                      className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    <PencilIcon className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true"/>
                    Edit
                  </Link>
                </span>


                  <span className="sm:ml-3">
                  <button
                      type="button" onClick={handleDeleteSubject}
                      className=" inline-flex items-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                  >
                    <CheckIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true"/>
                    Delete
                  </button>
                </span>

                  {/* Dropdown */}
                  <Menu as="div" className="relative ml-3 sm:hidden">
                    <Menu.Button
                        className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400">
                      More
                      <ChevronDownIcon className="-mr-1 ml-1.5 h-5 w-5 text-gray-400" aria-hidden="true"/>
                    </Menu.Button>

                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items
                          className="absolute right-0 z-10 -mr-1 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({active}) => (
                              <Link
                                  to={`/edit-subject/${subject ? subject.id : ""}`}
                                  className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                              >
                                Edit
                              </Link>
                          )}
                        </Menu.Item>
                        {/* <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                  >
                    View
                  </a>
                )}
              </Menu.Item> */}
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
            }
          </div>


          {/* Course Objectives */}
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 ">
            <div className="text-sm font-medium leading-6 text-gray-900">
              <p>Course Objectives</p>
              {isSuperuser &&
                  <Link to={`/add-course-objective/${subject ? subject.id : ""}`}
                        className="inline-block bg-gradient-to-tr from-indigo-500 to-indigo-700 mb-1 text-white rounded-lg px-4 py-2 hover:bg-indigo-600 hover:to-indigo-800 shadow-md">Add
                    Course Objectives</Link>
              }
            </div>

            <div className="relative overflow-x-auto col-span-3 rounded-lg shadow-lg">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 bg-white ">
                <thead className="text-xs  uppercase  bg-gray-500 text-white">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    S. no
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Description
                  </th>
                  {isSuperuser &&
                      <th scope="col" className="px-6 py-3">
                        Edit or Delete
                      </th>
                  }
                </tr>
                </thead>
                <tbody>
                {subject && subject.cob && subject.cob.map((cob, index) => (
                    <tr key={cob.id} className="border-b bg-white text-gray-700">
                      <td className="px-6 py-4">{index + 1}</td>
                      <td className="px-6 py-4">{cob.name}</td>
                      <td className="px-6 py-4">
                        {isSuperuser &&
                            <Link to={`/edit-course-objective/${cob.id}`}
                                  className="mr-1 inline-block bg-gradient-to-tr mt-2 from-indigo-500 to-indigo-700 mb-1 text-white rounded-lg px-4 py-2 hover:bg-indigo-600 hover:to-indigo-800 shadow-md">Edit</Link>
                        }
                        {isSuperuser &&
                            <DeleteCourseObjective cobId={cob.id}/>
                        }
                      </td>
                    </tr>
                ))}
                </tbody>
              </table>
            </div>
          </div>


          {/* Course Outcome */}
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 ">
            <div className="text-sm font-medium leading-6 text-gray-900">
              <p>Course Outcome</p>
              {isSuperuser &&
                  <Link to={`/add-course-outcome/${subject ? subject.id : ""}`}
                        className="inline-block bg-gradient-to-tr from-indigo-500 to-indigo-700 mb-1 text-white rounded-lg px-4 py-2 hover:bg-indigo-600 hover:to-indigo-800 shadow-md">Add
                    Course Outcome</Link>
              }
            </div>

            <div className="relative overflow-x-auto col-span-3 rounded-lg shadow-lg">
              <table className="w-full text-sm text-left rtl:text-right text-gray-700 bg-white">
                <thead className="text-xs  bg-gray-500 uppercase text-white">
                <tr>
                  <th scope="col" className="px-6 py-3">Co</th>
                  <th scope="col" className="px-6 py-3">Description</th>
                  <th scope="col" className="px-6 py-3">U / AP</th>
                  {isSuperuser &&
                      <th scope="col" className="px-6 py-3">Edit or Delete</th>
                  }
                </tr>
                </thead>
                <tbody>
                {subject && subject.co && subject.co.map((co, index) => (
                    <tr key={co.id} className="border-b bg-white text-gray-700 ">
                      <td className="px-6 py-4">{co.title}</td>
                      <td className="px-6 py-4">{co.description}</td>
                      <td className="px-6 py-4">{co.uap}</td>
                      <td className="px-6 py-4">
                        {isSuperuser &&
                            <Link to={`/edit-course-outcome/${co.id}`}
                                  className="mr-1 inline-block bg-gradient-to-tr mt-2 from-indigo-500 to-indigo-700 mb-1 text-white rounded-lg px-4 py-2 hover:bg-indigo-600 hover:to-indigo-800 shadow-md">Edit</Link>
                        }
                        {isSuperuser &&
                            <DeleteCourseOutcome coId={co.id}/>
                        }
                      </td>
                    </tr>
                ))}
                </tbody>
              </table>
            </div>
          </div>


          {/* Lab Component */}
          {(subject && (subject.t_or_p === "Theory and Practical" || subject.t_or_p === "Practical")) &&
              (<div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <div className="text-sm font-medium leading-6 text-gray-900">
                  <p>Lab Component</p>
                  {isSuperuser &&
                      <Link to={`/add-lab-component/${subject ? subject.id : ""}`}
                            className="inline-block bg-gradient-to-tr from-indigo-500 to-indigo-700 mb-1 text-white rounded-lg px-4 py-2 hover:bg-indigo-600 hover:to-indigo-800 shadow-md">Add
                        Lab Component</Link>
                  }
                </div>

                <div className="relative overflow-x-auto col-span-3 rounded-lg shadow-lg">
                  <table className="w-full text-sm text-left rtl:text-right text-gray-700 bg-white">
                    <thead className="text-xs bg-gray-500 text-white uppercase">
                    <tr>
                      <th scope="col" className="px-6 py-3">S. no</th>
                      <th scope="col" className="px-6 py-3">List of Experiments</th>
                      <th scope="col" className="px-6 py-3">CO Mapping</th>
                      <th scope="col" className="px-6 py-3">RBT</th>
                      {isSuperuser &&
                          <th scope="col" className="px-6 py-3">Edit or Delete</th>
                      }
                    </tr>
                    </thead>
                    <tbody>
                    {subject && subject.lab && subject.lab.map((lab, index) => (
                        <tr key={lab.id} className="border-b bg-white text-gray-700">
                          <td className="px-6 py-4">{index + 1}</td>
                          <td className="px-6 py-4">{lab.lie}</td>
                          <td className="px-6 py-4">{lab.co_mapping}</td>
                          <td className="px-6 py-4">{lab.rbt}</td>
                          <td className="px-6 py-4">
                            {isSuperuser &&
                                <Link to={`/edit-lab-component/${lab.id}`}
                                      className="mr-1 inline-block bg-gradient-to-tr mt-2 from-indigo-500 to-indigo-700 mb-1 text-white rounded-lg px-4 py-2 hover:bg-indigo-600 hover:to-indigo-800 shadow-md">Edit</Link>
                            }
                            {isSuperuser &&
                                <DeleteLabComponent labId={lab.id}/>
                            }
                          </td>
                        </tr>
                    ))}
                    </tbody>
                  </table>
                </div>
              </div>)}


          {/* Course Content*/}

          {(subject && (subject.t_or_p === "Theory" || subject.t_or_p === "Theory and Practical")) && (
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <div className="text-sm font-medium leading-6 text-gray-900">
                  <p>Course Content</p>
                  {isSuperuser &&
                      <Link
                          to={`/add-course-content/${subject ? subject.id : ""}`}
                          className="inline-block bg-gradient-to-tr from-indigo-500 to-indigo-700 mb-1 text-white rounded-lg px-4 py-2 hover:bg-indigo-600 hover:to-indigo-800 shadow-md"
                      >
                        Add Course Content
                      </Link>
                  }
                </div>

                <div className="relative overflow-x-auto sm:col-span-3 rounded-lg shadow-lg">
                  <table className="w-full text-sm text-left rtl:text-right text-gray-700 bg-white">
                    <thead className="text-xs bg-gray-500 text-white uppercase">
                    <tr>
                      <th scope="col" className="px-6 py-3">Module</th>
                      <th scope="col" className="px-6 py-3">Title</th>
                      <th scope="col" className="px-6 py-3">Description</th>
                      <th scope="col" className="px-6 py-3">Hours Per Week</th>
                      {isSuperuser && (
                          <th scope="col" className="px-6 py-3">Edit or Delete</th>
                      )}
                    </tr>
                    </thead>
                    <tbody>
                    {subject?.cc?.map((cc, index) => (
                        <tr key={cc.id} className="border-b bg-white text-gray-700">
                          <td className="px-6 py-4">{index + 1}</td>
                          <td className="py-4">{cc.title}</td>
                          <td className="w-1/2 py-4">{cc.description}</td>
                          <td className="px-6 py-4">{cc.hrs_pw}</td>
                          {isSuperuser && (
                              <td className="px-6 py-4">
                                <Link
                                    to={`/edit-course-content/${cc.id}`}
                                    className="mr-1 inline-block bg-gradient-to-tr mt-2 from-indigo-500 to-indigo-700 mb-1 text-white rounded-lg px-4 py-2 hover:bg-indigo-600 hover:to-indigo-800 shadow-md"
                                >
                                  Edit
                                </Link>
                                <DeleteCourseContent ccId={cc.id}/>
                              </td>
                          )}
                        </tr>
                    ))}
                    </tbody>
                  </table>
                </div>
              </div>
          )}


          {/* Text Book Reference */}
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <div className="text-sm font-medium leading-6 text-gray-900">
              <p>Text Book Reference</p>
              {isSuperuser &&
                  <Link
                      to={`/add-text-book/${subject ? subject.id : ""}`}
                      className="inline-block bg-gradient-to-tr from-indigo-500 to-indigo-700 mb-1 text-white rounded-lg px-4 py-2 hover:bg-indigo-600 hover:to-indigo-800 shadow-md"
                  >
                    Add Text Book Reference
                  </Link>
              }
            </div>

            <div className="relative overflow-x-auto sm:col-span-3 rounded-lg shadow-lg">
              <table className="w-full text-sm text-left rtl:text-right text-gray-700 bg-white">
                <thead className="text-xs bg-gray-500 text-white uppercase">
                <tr>
                  <th scope="col" className="px-6 py-3">S. no</th>
                  <th scope="col" className="">Book Name</th>
                  {isSuperuser && (
                      <th scope="col" className="px-6 py-3">Edit or Delete</th>
                  )}
                </tr>
                </thead>
                <tbody>
                {subject?.tb?.map((tb, index) => (
                    <tr key={tb.id} className="border-b bg-white text-gray-700">
                      <td className="px-6 py-4">{index + 1}</td>
                      <td className="py-4">{tb.name}</td>
                      {isSuperuser && (
                          <td className="px-6 py-4">
                            <Link
                                to={`/edit-text-book/${tb.id}`}
                                className="mr-1 inline-block bg-gradient-to-tr mt-2 from-indigo-500 to-indigo-700 mb-1 text-white rounded-lg px-4 py-2 hover:bg-indigo-600 hover:to-indigo-800 shadow-md"
                            >
                              Edit
                            </Link>
                            <DeleteTextBookReference tbId={tb.id}/>
                          </td>
                      )}
                    </tr>
                ))}
                </tbody>
              </table>
            </div>
          </div>


          {/* Reference Book */}

          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <div className="text-sm font-medium leading-6 text-gray-900">
              <p>Reference Book</p>
              {isSuperuser &&
                  <Link
                      to={`/add-reference-book/${subject ? subject.id : ""}`}
                      className="inline-block bg-gradient-to-tr from-indigo-500 to-indigo-700 mb-1 text-white rounded-lg px-4 py-2 hover:bg-indigo-600 hover:to-indigo-800 shadow-md"
                  >
                    Add Reference Book
                  </Link>
              }
            </div>

            <div className="relative overflow-x-auto sm:col-span-3 rounded-lg shadow-lg">
              <table className="w-full text-sm text-left rtl:text-right text-gray-700 bg-white">
                <thead className="text-xs bg-gray-500 text-white uppercase">
                <tr>
                  <th scope="col" className="px-6 py-3">S. no</th>
                  <th scope="col" className="">Book Name</th>
                  {isSuperuser && (
                      <th scope="col" className="px-6 py-3">Edit or Delete</th>
                  )}
                </tr>
                </thead>
                <tbody>
                {subject?.rb?.map((rb, index) => (
                    <tr key={rb.id} className="border-b bg-white text-gray-700">
                      <td className="px-6 py-4">{index + 1}</td>
                      <td className="py-4">{rb.name}</td>
                      {isSuperuser && (
                          <td className="px-6 py-4">
                            <Link
                                to={`/edit-reference-book/${rb.id}`}
                                className="mr-1 inline-block bg-gradient-to-tr mt-2 from-indigo-500 to-indigo-700 mb-1 text-white rounded-lg px-4 py-2 hover:bg-indigo-600 hover:to-indigo-800 shadow-md"
                            >
                              Edit
                            </Link>
                            <DeleteReferenceBook rbId={rb.id}/>
                          </td>
                      )}
                    </tr>
                ))}
                </tbody>
              </table>
            </div>
          </div>


          {/* Web References  */}
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <div className="text-sm font-medium leading-6 text-gray-900">
              <p>Web Reference</p>
              {isSuperuser &&
                  <Link
                      to={`/add-web-reference/${subject ? subject.id : ""}`}
                      className="inline-block bg-gradient-to-tr from-indigo-500 to-indigo-700 mb-1 text-white rounded-lg px-4 py-2 hover:bg-indigo-600 hover:to-indigo-800 shadow-md"
                  >
                    Add Web Reference
                  </Link>
              }
            </div>

            <div className="relative overflow-x-auto sm:col-span-3 rounded-lg shadow-lg">
              <table className="w-full text-sm text-left rtl:text-right text-gray-700 bg-white">
                <thead className="text-xs bg-gray-500 text-white uppercase">
                <tr>
                  <th scope="col" className="px-6 py-3">S. no</th>
                  <th scope="col" className="">URL</th>
                  {isSuperuser && (
                      <th scope="col" className="px-6 py-3">Edit or Delete</th>
                  )}
                </tr>
                </thead>
                <tbody>
                {subject?.wr?.map((wr, index) => (
                    <tr key={wr.id} className="border-b bg-white text-gray-700">
                      <td className="px-6 py-4">{index + 1}</td>
                      <td className="py-4">{wr.url}</td>
                      {isSuperuser && (
                          <td className="px-6 py-4">
                            <Link
                                to={`/edit-web-reference/${wr.id}`}
                                className="mr-1 inline-block bg-gradient-to-tr mt-2 from-indigo-500 to-indigo-700 mb-1 text-white rounded-lg px-4 py-2 hover:bg-indigo-600 hover:to-indigo-800 shadow-md"
                            >
                              Edit
                            </Link>
                            <DeleteWebReference wrId={wr.id}/>
                          </td>
                      )}
                    </tr>
                ))}
                </tbody>
              </table>
            </div>
          </div>


          {/* Online References  */}
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <div className="text-sm font-medium leading-6 text-gray-900">
              <p>Online Reference</p>
              {isSuperuser &&
                  <Link
                      to={`/add-online-reference/${subject ? subject.id : ""}`}
                      className="inline-block bg-gradient-to-tr from-indigo-500 to-indigo-700 mb-1 text-white rounded-lg px-4 py-2 hover:bg-indigo-600 hover:to-indigo-800 shadow-md"
                  >
                    Add Online Reference
                  </Link>
              }
            </div>

            <div className="relative overflow-x-auto sm:col-span-3 rounded-lg shadow-lg">
              <table className="w-full text-sm text-left rtl:text-right text-gray-700 bg-white">
                <thead className="text-xs bg-gray-500 text-white uppercase">
                <tr>
                  <th scope="col" className="px-6 py-3">S. no</th>
                  <th scope="col" className="">URL</th>
                  {isSuperuser && (
                      <th scope="col" className="px-6 py-3">Edit or Delete</th>
                  )}
                </tr>
                </thead>
                <tbody>
                {subject?.oref?.map((oref, index) => (
                    <tr key={oref.id} className="border-b bg-white text-gray-700">
                      <td className="px-6 py-4">{index + 1}</td>
                      <td className="py-4">{oref.url}</td>
                      {isSuperuser && (
                          <td className="px-6 py-4">
                            <Link
                                to={`/edit-online-reference/${oref.id}`}
                                className="mr-1 inline-block bg-gradient-to-tr mt-2 from-indigo-500 to-indigo-700 mb-1 text-white rounded-lg px-4 py-2 hover:bg-indigo-600 hover:to-indigo-800 shadow-md"
                            >
                              Edit
                            </Link>
                            <DeleteOnlineReference orefId={oref.id}/>
                          </td>
                      )}
                    </tr>
                ))}
                </tbody>
              </table>
            </div>
          </div>


          {console.log(`Subject ID: ${subject ? subject.id : ""}`)}
          <aside>
            <div style={{textAlign: 'center', marginTop: '50px'}}>

              <PDFDownloadLink

                  document={<SubjectDetailPDF className='mb-5' sid={subject ? subject.id : ""}/>}
                  fileName={subject ? subject.course_code : ""}
                  style={{
                    textDecoration: 'none',
                    padding: '10px 20px',
                    color: '#fff',
                    backgroundColor: '#007BFF',
                    border: 'none',
                    borderRadius: '4px',
                  }}
              >
                {({loading}) => (loading ? 'Loading document...' : 'Download PDF')}
              </PDFDownloadLink>
            </div>
          </aside>


        </dl>
      </div>
    </div>
  )
}

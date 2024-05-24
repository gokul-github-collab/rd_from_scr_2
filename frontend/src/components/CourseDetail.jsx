import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../api';
import { toast } from 'react-toastify';
import { FaArrowLeft, FaMapMarker, FaAsterisk } from 'react-icons/fa';
import { SlArrowDown } from "react-icons/sl";
import DeletePo from './DeletePo';
import DeletePso from './DeletePso';
import DeleteSyllabus from './DeleteSyllabus';

const FAQItem1 = ({ question, pos }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSuperuser, setIsSuperuser] = useState(false);

  useEffect(() => {
    checkSuperuser();
  }, []);

  const checkSuperuser = async () => {
    try {
      const res = await api.get("/api/check_superuser/");
      console.log("Response from check_superuser:", res);
      setIsSuperuser(res.data.is_superuser);
    } catch (err) {
      console.error("Error checking superuser:", err);
    }
  };

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="border border-gray-200 rounded p-4 mb-2 ">
      <div className="flex justify-between items-center cursor-pointer" onClick={toggleOpen}>
        <h2 className="text-lg font-medium">{question}</h2>
        <SlArrowDown />
      </div>
      {isOpen && (
        <div className="mt-2">
          {pos && (
            <div>
              {pos.map((item) => (
                <div key={item.id} className="mb-2">
                  <h4 className="text-lg font-semibold mb-1">{item.title}</h4>
                  <p className="text-gray-600">{item.description}</p>
                  {isSuperuser && (
                    <>
                      <Link to={`/edit-po/${item.id}`} className='inline-block bg-gradient-to-tr from-indigo-500 to-indigo-700 mb-1 text-white rounded-lg px-4 py-2 hover:bg-indigo-600 hover:to-indigo-800 shadow-md'>Edit PO</Link>
                      <DeletePo id={item.id} />
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const FAQItem2 = ({ question, psos }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSuperuser, setIsSuperuser] = useState(false);

  useEffect(() => {
    checkSuperuser();
  }, []);

  const checkSuperuser = async () => {
    try {
      const res = await api.get("/api/check_superuser/");
      console.log("Response from check_superuser:", res);
      setIsSuperuser(res.data.is_superuser);
    } catch (err) {
      console.error("Error checking superuser:", err);
    }
  };

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="border border-gray-200 rounded p-4 mb-2 ">
      <div className="flex justify-between items-center cursor-pointer" onClick={toggleOpen}>
        <h2 className="text-lg font-medium">{question}</h2>
        <SlArrowDown />
      </div>
      {isOpen && (
        <div className="mt-2">
          {psos && (
            <div>
              {psos.map((item) => (
                <div key={item.id} className="mb-2">
                  <h4 className="text-lg font-semibold mb-1">{item.title}</h4>
                  <p className="text-gray-600">{item.description}</p>
                  {isSuperuser && (
                    <>
                      <Link to={`/edit-pso/${item.id}`} className='inline-block bg-gradient-to-tr from-indigo-500 to-indigo-700 mb-1 text-white rounded-lg px-4 py-2 hover:bg-indigo-600 hover:to-indigo-800 shadow-md'>Edit PSO</Link>
                      <DeletePso id={item.id} />
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const CourseDetail = () => {
  const [course, setCourse] = useState(null);
  const [isSuperuser, setIsSuperuser] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchCourseDetail(id);
    checkSuperuser();
  }, [id]);

  const fetchCourseDetail = async (courseId) => {
    try {
      const res = await api.get(`/api/courses/${courseId}/`);
      setCourse(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const checkSuperuser = async () => {
    try {
      const res = await api.get("/api/check_superuser/");
      console.log("Response from check_superuser:", res);
      setIsSuperuser(res.data.is_superuser);
    } catch (err) {
      console.error("Error checking superuser:", err);
    }
  };

  const handleDeleteCourse = async () => {
    if (window.confirm(`Are you sure you want to delete ${course.name}`)) {
      try {
        await api.delete(`/api/courses/delete/${course.id}/`);
        toast.error('Course deleted successfully');
        navigate("/courses");
      } catch (err) {
        alert(err);
      }
    }
  };

  return (
    <>
      {course && (
        <div className="bg-gray-100">
          <section>
            <div className="container m-auto py-6 px-6">
              <Link to="/courses" className="text-indigo-500 hover:text-indigo-600 flex items-center">
                <FaArrowLeft className='text-indigo-500 mr-2' />Back to Course Listings
              </Link>
            </div>
          </section>
          <section className="">
            <div className="container m-auto py-10 px-6">
              <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
                <main>
                  <div className="bg-white p-6 rounded-lg shadow-md text-center md:text-left">
                    <div className="text-gray-500 mb-4">{course.type}</div>
                    <h1 className="text-3xl font-bold mb-4">{course.name}</h1>
                    <div className="text-gray-500 mb-4 flex align-middle justify-center md:justify-start">
                      <FaMapMarker className='text-orange-700 mr-1' />
                      <p className="text-orange-700">{course.location}</p>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                    <h3 className="text-indigo-800 text-lg font-bold mb-6">Course Description</h3>
                    <p className="mb-4">{course.description}</p>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                    <h3 className="text-indigo-800 text-lg font-bold mb-6">Course Program Outcomes</h3>
                    {isSuperuser && (
                      <div>
                        <Link to={`/add-po/${course.id}`} className="inline-block bg-gradient-to-tr from-indigo-500 to-indigo-700 mb-1 text-white rounded-lg px-4 py-2 hover:bg-indigo-600 hover:to-indigo-800 shadow-md">Add Program Outcomes (PO's)</Link>
                        <Link to={`/add-pso/${course.id}`} className="inline-block bg-gradient-to-tr from-[#ffccd9] to-[#ebe9ff] ml-1 mb-1 text-gray-800 rounded-lg px-4 py-2 hover:bg-gradient-to-tr hover:from-[#ebe9ff] hover:to-[#ffccd9] hover:text-gray-800 shadow-md">Add Program Specific Outcomes (PSO's)</Link>
                      </div>
                    )}
                    <FAQItem1 question="Program Outcome (PO's)" pos={course.pos} />
                    <FAQItem2 question="Program Specific Outcome (PSO's)" psos={course.psos} />
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                    <h3 className="text-indigo-800 text-lg font-bold mb-6">Syllabus</h3>
                    {isSuperuser && (
                      <Link to={`/add-syllabus/${course.id}`} className="inline-block mb-2 bg-gradient-to-tr from-indigo-500 to-indigo-700 mb-1 text-white rounded-lg px-4 py-2 hover:bg-indigo-600 hover:to-indigo-800 shadow-md">Add Syllabus</Link>
                    )}
                    {course.syllabus && course.syllabus.map((syllabus) => (
                      <div key={syllabus.id} className="flex items-center space-x-4">
                        <Link to={`/syllabus/${syllabus.id}`} className='text-indigo-500'>
                          <FaAsterisk className='inline-block h-3' /> {syllabus.year}
                        </Link>
                        {isSuperuser && (
                          <>
                            <Link to={`/edit-syllabus/${syllabus.id}`} className='text-purple-500'>
                              - Edit
                            </Link>
                            <DeleteSyllabus sylId={syllabus.id} />
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </main>
                <aside>
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold mb-6">College Info</h3>
                    <h2 className="text-2xl">Sri Krishna Adithya College of Arts and Science</h2>
                    <hr className="my-4" />
                    <h3 className="text-xl">Contact Email:</h3>
                    <p className="my-2 bg-indigo-100 p-2 font-bold">contact@skacas.ac.in</p>
                    <h3 className="text-xl">Contact Phone:</h3>
                    <p className="my-2 bg-indigo-100 p-2 font-bold">5555-5555-5555</p>
                  </div>
                  {isSuperuser && (
                    <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                      <h3 className="text-xl font-bold mb-6">Manage Course</h3>
                      <Link to={`/courses/edit/${course.id}`} className="bg-gradient-to-tr from-indigo-500 to-indigo-700 text-white rounded-lg px-4 py-2 hover:bg-indigo-600 hover:to-indigo-800 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block">Edit Course</Link>
                      <button onClick={handleDeleteCourse} className="bg-gradient-to-tr from-red-500 to-red-700 text-white rounded-lg px-4 py-2 hover:bg-red-600 hover:to-red-800 shadow-md text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block">Delete Course</button>
                    </div>
                  )}
                </aside>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default CourseDetail;

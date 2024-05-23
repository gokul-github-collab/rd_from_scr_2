import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../api';
import SemesterDetail from './SemesterDetail';

const SyllabusDetail = () => {
  const { id } = useParams();
  const [isSuperUser, setIsSuperuser] = useState(false);
  const [syllabus, setSyllabus] = useState(null);
  const [course, setCourse] = useState(null);

  useEffect(() => {
    getSyllabus(id);
    checkSuperuser();
  }, [id]);

  const getSyllabus = (id) => {
    api.get(`/api/syllabus/${id}/`)
        .then((res) => {
          setSyllabus(res.data);
          getCourse(res.data.course);
        })
        .catch((err) => {
          toast.error(err.message || 'Failed to fetch syllabus');
        });
  };

  const checkSuperuser = () => {
    api.get("/api/check_superuser/")
        .then((res) => {
          setIsSuperuser(res.data.is_superuser);
        })
        .catch((err) => {
          console.error("Error checking superuser:", err);
        });
  };

  const getCourse = (courseId) => {
    api.get(`/api/courses/${courseId}/`)
        .then((res) => {
          setCourse(res.data);
        })
        .catch((err) => {
          toast.error(err.message || 'Failed to fetch course');
        });
  };

  return (
      <div className="relative min-h-screen bg-gray-100 py-24 px-4 sm:px-6 lg:px-8">

        <div className="relative max-w-6xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          <header className="bg-gradient-to-r from-indigo-300 to-purple-300 p-6 sm:p-8">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-white">
                  {syllabus ? syllabus.year : ""}
                </p>
                <h1 className="text-2xl font-bold text-white mt-1">
                  Syllabus for {course ? course.name : "Course Name"}
                </h1>
              </div>
              {isSuperUser && (
                  <Link
                      to={`/add-semester/${syllabus ? syllabus.id : ""}/${course ? course.id : ""}`}
                      className="bg-white text-indigo-600 hover:text-white hover:bg-indigo-600 font-semibold py-2 px-4 rounded-md shadow-md transition duration-300"
                  >
                    Add Semester
                  </Link>
              )}
            </div>
          </header>
          <main className="p-6 sm:p-8">
            <section>
              <h2 className="text-xl font-semibold text-gray-900">About the Course</h2>
              <p className="text-gray-700 mt-4">
                Right from the inception, the curriculum is taught by distinguished faculty members combining academic excellence and real-world experience with dedication and commitment. The department scales with innovatively designed programs which constantly get updated to meet the challenging requirement of the industry and stakeholders. We are proud to see many industries coming back to our department, which sustain to meet the dynamic corporate world.
              </p>
            </section>
            <section className="mt-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Semesters</h2>
              <div className="grid grid-cols-1 gap-6">
                {syllabus && syllabus.sem && syllabus.sem.map((sem) => (
                    <div key={sem.id} className="bg-gray-50 p-4 rounded-lg shadow-md">
                      <SemesterDetail semId={sem.id} />
                    </div>
                ))}
              </div>
            </section>
          </main>
        </div>
      </div>
  );
};

export default SyllabusDetail;

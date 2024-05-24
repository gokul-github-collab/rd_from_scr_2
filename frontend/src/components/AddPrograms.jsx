import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import NotFound from '../pages/NotFound';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const AddPrograms = () => {
  const [isSuperUser, setIsSuperuser] = useState(false);
  const [loading, setLoading] = useState(true);  // New loading state

  const [agreed, setAgreed] = useState(false);

  useEffect(() => {
    checkSuperuser();
  }, []);

  const [course, setCourse] = useState([]);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");

  const navigate = useNavigate();

  const checkSuperuser = async () => {
    try {
      const res = await api.get("/api/check_superuser/");
      console.log("Response from check_superuser:", res);
      setIsSuperuser(res.data.is_superuser);
    } catch (err) {
      console.error("Error checking superuser:", err);
    } finally {
      setLoading(false);  // Set loading to false when check is complete
    }
  };

  const getCourse = async () => {
    try {
      const res = await api.get("/api/courses/");
      setCourse(res.data);
    } catch (err) {
      alert(err.message);
    }
  };

  const createCourse = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/api/courses/", { name, type, description, location });
      if (res.status === 201) {
        toast.success("Course Created Successfully");
        navigate(`/courses`);
      } else {
        toast.error("Course hasn't been created");
      }
      getCourse();
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!isSuperUser) {
    return <NotFound />;
  }

  return (
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
    </div>
  );
};

export default AddPrograms;

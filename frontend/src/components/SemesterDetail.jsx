import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
// import FAQItem1 from './FAQItem1'; // Importing FAQItem1 component
import { SlArrowDown } from "react-icons/sl";
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


const FAQItem1 = ({ question, pos, id, syllabus }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSuperuser, setIsSuperuser] = useState(false);
  const [subjectsDropdown, setSubjectsDropdown] = useState([]);

  useEffect(() => {
    checkSuperuser();
  }, []);

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

  const toggleOpen = (e) => {
    // Check if the clicked element is the arrow icon
    if (e.target.tagName.toLowerCase() !== 'svg') {
      setIsOpen(!isOpen);
    }
  };

  useEffect(() => {
    if (pos && pos.length > 0) {
      // Extract subjects from pos
      const subjects = pos.map(item => ({
        value: item.id,
        label: `${item.course_code} - ${item.name}`
      }));
      setSubjectsDropdown(subjects);
    }
  }, [pos]);

  const handleDeleteSemester = async () => {
    if (window.confirm(`Are you sure you want to delete ${id}`)) {
      try {
        await api.delete(`/api/semester/delete/${id}/`);
        toast.error('Semester deleted successfully');
        navigate(`/syllabus/${syllabus}`);
      } catch (err) {
        toast.error(err);
      }
    }
  };
  return (
    <div className="border border-gray-200 rounded p-4 mb-2">
      <div className="flex justify-between items-center cursor-pointer" onClick={toggleOpen}>
        <h2 className="text-lg font-medium">{question}   {isSuperuser && <>     <Link
          to={`/edit-semester/${id}`}
          className=" mx-1 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          <PencilIcon className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
          Edit
        </Link>

          <button
            type="button" onClick={handleDeleteSemester}
            className="mx-1 inline-flex items-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
          >
            <CheckIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
            Delete
          </button>
          <Link
            to={`/add-subject/${id}`}
            className=" mx-1 inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {/* <HiMiniPlusCircle className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400"/> */}
            <PencilIcon className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
            Add Subject
          </Link>
        </>}
        </h2>
        <SlArrowDown />
      </div>
      {isOpen && (
        <div className="mt-2">
          {subjectsDropdown.length > 0 && (
            <div>

              <ul className="list-disc ml-6">
                {subjectsDropdown.map(subject => (
                  <li key={subject.value}> <Link className='text-indigo-700' to={`/subject/${subject.value}`} >{subject.label}</Link> </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};




const SemesterDetail = ({ semId }) => {
  const [semester, setSemester] = useState(null);
  const [subjectsDropdown, setSubjectsDropdown] = useState([]);
  const navigate = useNavigate();
  const [isSuperUser, setIsSuperuser] = useState(false);

  useEffect(() => {
    getSemester(semId);
    checkSuperuser();
  }, [semId]);

  const getSemester = (id) => {
    api.get(`/api/semester/${id}/`)
      .then((res) => {
        setSemester(res.data);
        if (res.data && res.data.subjects) {
          // Create dropdown options for subjects
          const options = res.data.subjects.map(subject => ({
            value: subject.id,
            label: `${subject.course_code} - ${subject.name} - ${subject.t_or_p}`
          }));
          setSubjectsDropdown(options);
        }
      })
      .catch((err) => toast.error(err));
  };

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



  return (
    <div>

      {/* <button onClick={handleDeleteSemester} className="inline-block bg-gradient-to-tr from-red-500 to-red-700 mb-1 text-white rounded-lg px-4 py-2 hover:bg-red-600 hover:to-red-800 shadow-md">
        Delete Semester
      </button>
      <Link to={`/edit-semester/${semester ? semester.id : ""}`} className="inline-block bg-gradient-to-tr from-purple-500 to-purple-700 mb-1 text-white rounded-lg px-4 py-2 hover:bg-purple-600 hover:to-purple-800 shadow-md" >Edit Semester</Link> */}



      {/* Render FAQItem1 */}
      <FAQItem1 question={semester ? semester.title : ""} id={semester ? semester.id : ""} syllabus={semester ? semester.syllabus : ""} pos={semester && semester.subjects} />
    </div>
  );
};

export default SemesterDetail;
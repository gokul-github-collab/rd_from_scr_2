import React, { useState } from 'react';
import { FaMapMarker } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import api from '../api'; // Make sure to import your API utility

const CourseItem = ({ course }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [fullDescription, setFullDescription] = useState(course.description);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggleDescription = async () => {
    setShowFullDescription((prevState) => !prevState);

    if (!showFullDescription && fullDescription === course.description) {
      setIsLoading(true);
      try {
        const response = await api.get(`/api/courses/${course.id}/details`);
        setFullDescription(response.data.fullDescription);
      } catch (error) {
        console.error("Error fetching full description:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  let description = showFullDescription ? fullDescription : course.description.substring(0, 90) + '...';

  return (
    <div className="bg-white rounded-xl shadow-md relative">
      <div className="p-4">
        <div className="mb-6">
          <div className="text-gray-600 my-2">{course.type}</div>
          <h3 className="text-xl font-bold">{course.name}</h3>
        </div>

        <div className="mb-5">{description}</div>
        <button
          onClick={handleToggleDescription}
          className="text-indigo-500 mb-5 hover:text-indigo-600"
        >
          {showFullDescription ? 'Less' : 'More'}
        </button>

        <div className="border border-gray-100 mb-5"></div>

        <div className="flex flex-col lg:flex-row justify-between mb-4">
          <div className="text-orange-700 mb-3">
            <FaMapMarker className='inline text-lg mb-1 mr-1 ' />
            {course.location}
          </div>
          <Link
            to={`/courses/${course.id}`}
            className="h-[36px] bg-gradient-to-br from-indigo-300 to-indigo-500 hover:from-indigo-500 hover:to-indigo-300 text-white px-4 py-2 rounded-lg text-center text-sm"
          >
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseItem;

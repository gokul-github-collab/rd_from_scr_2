import React, { useEffect, useState } from 'react'
import api from '../api'
import { Link } from 'react-router-dom'
import { SlArrowDown } from "react-icons/sl";
import DeletePo from './DeletePo'



const FAQItem1 = ({ question, pos }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSuperuser, setIsSuperuser] = useState(false)

  useEffect(() => { checkSuperuser() }, [])

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

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="border border-gray-200 rounded p-4 mb-2">
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

                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
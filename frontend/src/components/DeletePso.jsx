import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { toast } from 'react-toastify';

const DeletePso = ({ id }) => {
    const navigate = useNavigate();
    const [pso, setPso] = useState(null);

    useEffect(() => {
        getPo(id);
    }, [id]);

    const getPo = (id) => {
        api.get(`/api/psos/${id}/`)
            .then((res) => setPso(res.data))
            .catch((err) => toast.error(err));
    };

    const deletePso = async () => {
        if (window.confirm(`Are you sure want to delete ${pso ? pso.title : ""}`)) {
            try {
                await api.delete(`/api/psos/delete/${id}/`);
                console.log(pso.course);
                navigate(`/courses/${pso.course}/`);
                toast.error("Program Outcome Deleted successfully");
                setTimeout(() => {
                    window.location.reload();
                }, 2000); // Adjust the timeout duration as needed
            } catch (err) {
                toast.error(err.message);
            }
        }
    };

    return (
        <>
            <button
                onClick={deletePso}
                className="inline-block ml-1 mt-1 bg-gradient-to-tr from-red-500 to-red-700 mb-1 text-white rounded-lg px-4 py-2 hover:bg-red-600 hover:to-red-800 shadow-md"
            >
                Delete PSO
            </button>
        </>
    );
};

export default DeletePso;

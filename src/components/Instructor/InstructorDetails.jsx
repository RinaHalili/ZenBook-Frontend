import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getInstructorById } from '../../services/api';

const InstructorDetails = () => {
  const { id } = useParams();
  const [instructor, setInstructor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInstructor = async () => {
      try {
        const data = await getInstructorById(id);
        setInstructor(data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchInstructor();
  }, [id]);

  if (loading) {
    return <p>Loading instructor details...</p>;
  }

  if (error) {
    return <p>Error loading instructor details: {error.message}</p>;
  }

  if (!instructor) {
    return <p>Instructor not found.</p>;
  }

  return (
    <div>
      <h2>Instructor Details</h2>
      <p><strong>Full Name:</strong> {instructor.fullName}</p>
      <p><strong>Email:</strong> {instructor.email}</p>
      <p><strong>Phone Number:</strong> {instructor.phoneNumber}</p>
      <p><strong>Date of Birth:</strong> {new Date(instructor.dateOfBirth).toLocaleDateString()}</p>
      <p><strong>Department:</strong> {instructor.department}</p>
      <p><strong>Bio:</strong> {instructor.bio}</p>
      <p><strong>Active:</strong> {instructor.isActive ? 'Yes' : 'No'}</p>
      {/* Add more instructor properties as needed */}
    </div>
  );
};

export default InstructorDetails;
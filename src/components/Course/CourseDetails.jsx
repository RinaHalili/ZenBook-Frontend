import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCourseById } from '../../services/api';

const CourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        const data = await getCourseById(id);
        setCourse(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  if (loading) {
    return <div>Loading course details...</div>;
  }

  if (error) {
    return <div>Error loading course details: {error.message}</div>;
  }

  if (!course) {
    return <div>Course not found.</div>;
  }

  return (
    <div>
      <h2>Course Details</h2>
      <p><strong>Title:</strong> {course.title}</p>
      <p><strong>Description:</strong> {course.description}</p>
      <p><strong>Start Date:</strong> {new Date(course.startDate).toLocaleDateString()}</p>
      <p><strong>End Date:</strong> {new Date(course.endDate).toLocaleDateString()}</p>
      <p><strong>Category:</strong> {course.category}</p>
      <p><strong>Duration (Hours):</strong> {course.durationInHours}</p>
      <p><strong>Instructor ID:</strong> {course.instructorId}</p>
      {/* Add more course details as needed */}
    </div>
  );
};

export default CourseDetails;
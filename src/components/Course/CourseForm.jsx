jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCourseById, createCourse, updateCourse } from '../../services/api';

function CourseForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    category: '',
    durationInHours: '',
    instructorId: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      setLoading(true);
      getCourseById(id)
        .then(response => {
          setFormData({
            ...response.data,
            // Format dates for input fields if necessary (e.g., to YYYY-MM-DD)
            startDate: response.data.startDate ? new Date(response.data.startDate).toISOString().split('T')[0] : '',
            endDate: response.data.endDate ? new Date(response.data.endDate).toISOString().split('T')[0] : '',
          });
          setLoading(false);
        })
        .catch(err => {
          setError('Failed to fetch course');
          setLoading(false);
          console.error(err);
        });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const courseData = {
        ...formData,
        // Ensure durationInHours is a number
        durationInHours: parseInt(formData.durationInHours, 10),
        // Ensure instructorId is a number
        instructorId: parseInt(formData.instructorId, 10),
    };


    const apiCall = id ? updateCourse(id, courseData) : createCourse(courseData);

    apiCall
      .then(() => {
        setLoading(false);
        navigate('/courses'); // Redirect to course list after success
      })
      .catch(err => {
        setError(`Failed to ${id ? 'update' : 'create'} course`);
        setLoading(false);
        console.error(err);
      });
  };

  if (loading && id) {
    return <div>Loading course...</div>;
  }

  return ( // Added a class for potential styling
    <div>
      <h2>{id ? 'Edit Course' : 'Create Course'}</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="startDate">Start Date:</label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="endDate">End Date:</label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="category">Category:</label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="durationInHours">Duration (Hours):</label>
          <input
            type="number"
            id="durationInHours"
            name="durationInHours"
            value={formData.durationInHours}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="instructorId">Instructor ID:</label>
          <input
            type="number"
            id="instructorId"
            name="instructorId"
            value={formData.instructorId}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {id ? 'Update Course' : 'Create Course'}
        </button>
      </form>
    </div>
  );
}

export default CourseForm;
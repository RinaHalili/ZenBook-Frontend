import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getInstructorById, createInstructor, updateInstructor } from '../../services/api';

const InstructorForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [instructor, setInstructor] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    dateOfBirth: '',
    department: '',
    bio: '',
    isActive: true,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInstructor = async () => {
      if (id) {
        try {
          const data = await getInstructorById(id);
          setInstructor(data);
        } catch (err) {
          setError(err);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };
    fetchInstructor();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setInstructor((prevInstructor) => ({
      ...prevInstructor,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await updateInstructor(id, instructor);
      } else {
        await createInstructor(instructor);
      }
      navigate('/instructors');
    } catch (err) {
      setError(err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading instructor: {error.message}</p>;

  return (
    <div>
      <h2>{id ? "Edit Instructor" : "Create Instructor"}</h2>
      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-group">
          <label htmlFor="fullName">Full Name:</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={instructor.fullName || ""}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={instructor.email || ""}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={instructor.phoneNumber || ""}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="dateOfBirth">Date of Birth:</label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={instructor.dateOfBirth ? new Date(instructor.dateOfBirth).toISOString().split('T')[0] : ''}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="department">Department:</label>
          <input
            type="text"
            id="department"
            name="department"
            value={instructor.department || ""}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="bio">Bio:</label>
          <textarea
            id="bio"
            name="bio"
            value={instructor.bio || ""}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div className="form-group form-checkbox">
          <label htmlFor="isActive">Is Active:</label>
          <input
            type="checkbox"
            id="isActive"
            name="isActive"
            checked={instructor.isActive || false}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="submit-button">{id ? "Update Instructor" : "Create Instructor"}</button>
      </form>
    </div>
  );
};

export default InstructorForm;
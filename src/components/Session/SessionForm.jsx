jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getSessionById, createSession, updateSession } from '../../services/api';

function SessionForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [session, setSession] = useState({
    courseId: '',
    instructorId: '',
    clientId: '',
    sessionDate: '',
    sessionTime: '',
    location: '',
    topic: '',
    isCompleted: false,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchSession = async () => {
        try {
          const response = await getSessionById(id);
          setSession(response.data);
          setLoading(false);
        } catch (err) {
          setError(err);
          setLoading(false);
        }
      };
      fetchSession();
    } else {
      setLoading(false);
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSession({
      // Convert numerical string inputs to numbers
      ...session,
      [name]: type === 'number' ? parseFloat(value) || '' : type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await updateSession(id, session);
      } else {
        await createSession(session);
      }
      navigate('/sessions');
    } catch (err) {
      setError(err);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h2>{id ? 'Edit Session' : 'Create New Session'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="courseId">Course ID:</label>
          <input
            type="number"
            id="courseId"
            name="courseId"
            value={session.courseId}
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
            value={session.instructorId}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="clientId">Client ID:</label>
          <input
            type="number"
            id="clientId"
            name="clientId"
            value={session.clientId}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="sessionDate">Session Date:</label>
 <input
 type="date"
            id="sessionDate"
            name="sessionDate"
            value={session.sessionDate}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="sessionTime">Session Time:</label>
 <input
 type="time"
            id="sessionTime"
            name="sessionTime"
            value={session.sessionTime}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            name="location"
            value={session.location || ''}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="topic">Topic:</label>
          <input
            type="text"
            id="topic"
            name="topic"
            value={session.topic || ''}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="isCompleted">Completed:</label>
          <input
            type="checkbox"
            id="isCompleted"
            name="isCompleted"
            checked={session.isCompleted}
            onChange={handleChange}
          />
        </div>
        <button type="submit">{id ? 'Update Session' : 'Create Session'}</button> {/* Consider changing button text if needed */}
      </form>
    </div>
  );
}

export default SessionForm;
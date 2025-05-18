jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getSessionById } from '../../services/api';

const SessionDetails = () => {
  const { id } = useParams();
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        setLoading(true);
        const data = await getSessionById(id);
        setSession(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, [id]);

  if (loading) {
    return <div>Loading session details...</div>;
  }

  if (error) {
    return <div>Error loading session details: {error.message}</div>;
  }

  if (!session) {
    return <div>Session not found.</div>;
  }

  return (
    <div>
      <h2>Session Details</h2>
      <p><strong>Course ID:</strong> {session.courseId}</p>
      <p><strong>Instructor ID:</strong> {session.instructorId}</p>
      <p><strong>Client ID:</strong> {session.clientId}</p>
      <p><strong>Session Date:</strong> {session.sessionDate}</p>
      <p><strong>Session Time:</strong> {session.sessionTime}</p>
      <p><strong>Location:</strong> {session.location}</p>
      <p><strong>Topic:</strong> {session.topic}</p>
      <p><strong>Completed:</strong> {session.isCompleted ? 'Yes' : 'No'}</p>
      {/* Add more session details as needed */}
    </div>
  );
};

export default SessionDetails;
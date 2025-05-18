jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getSessions, deleteSession } from '../../services/api';

function SessionList() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      const response = await getSessions();
      setSessions(response.data);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteSession(id);
      fetchSessions(); // Refresh the list after deletion
    } catch (err) {
      console.error('Error deleting session:', err);
      // Optionally show an error message to the user
    }
  };

  if (loading) {
    return <div>Loading sessions...</div>;
  }

  if (error) {
    return <div>Error loading sessions: {error.message}</div>;
  }

  return (
    <div>
      <h2>Sessions</h2>
 <Link to="/sessions/new" className="button">Add New Session</Link>
 <table className="data-table">
        <thead>
          <tr>
            <th>Course ID</th>
            <th>Instructor ID</th>
            <th>Client ID</th>
            <th>Session Date</th>
            <th>Session Time</th>
            <th>Location</th>
            <th>Topic</th>
            <th>Completed</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sessions.map((session) => (
            <tr key={session.id}>
              <td>{session.courseId}</td>
              <td>{session.instructorId}</td>
              <td>{session.clientId}</td>
              <td>{session.sessionDate}</td>
              <td>{session.sessionTime}</td>
              <td>{session.location}</td>
              <td>{session.topic}</td>
              <td>{session.isCompleted ? 'Yes' : 'No'}</td>
              <td>
                <Link to={`/sessions/${session.id}`}>View</Link> |{' '}
                <Link to={`/sessions/edit/${session.id}`}>Edit</Link> |{' '}
                <button onClick={() => handleDelete(session.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SessionList;
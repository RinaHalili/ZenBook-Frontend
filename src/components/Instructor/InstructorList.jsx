import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getInstructors, deleteInstructor } from "../../services/api";

function InstructorList() {
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const response = await getInstructors();
        setInstructors(response);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchInstructors();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteInstructor(id);
      setInstructors(instructors.filter((instructor) => instructor.id !== id));
    } catch (err) {
      console.error("Failed to delete instructor:", err);
      // Optionally show an error message to the user
    }
  };

  if (loading) {
    return <div>Loading instructors...</div>;
  }

  if (error) {
    return <div>Error loading instructors: {error.message}</div>;
  }

  return (
    <div>
      <h2>Instructors</h2>
      <Link to="/instructors/new">Add New Instructor</Link>
      <table className="table">
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Department</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {instructors.map((instructor) => (
            <tr key={instructor.id}>
              <td>{instructor.fullName}</td>
              <td>{instructor.department}</td>
              <td>{instructor.email}</td>
              <td>
                <Link to={`/instructors/${instructor.id}`}>View Details</Link> |{" "}
                <Link to={`/instructors/edit/${instructor.id}`}>Edit</Link> |{" "}
                <button onClick={() => handleDelete(instructor.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default InstructorList;

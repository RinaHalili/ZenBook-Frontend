jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCourses, deleteCourse } from '../services/api';

function CourseList() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await getCourses();
      setCourses(response.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch courses.");
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteCourse(id);
      setCourses(courses.filter(course => course.id !== id));
    } catch (err) {
      setError("Failed to delete course.");
    }
  };

  if (loading) {
    return <div>Loading courses...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Course List</h2>
      <Link to="/courses/new">Add New Course</Link>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map(course => (
            <tr key={course.id}>
              <td>{course.title}</td>
              <td>{course.category}</td>
              <td>{new Date(course.startDate).toLocaleDateString()}</td>
              <td>{new Date(course.endDate).toLocaleDateString()}</td>
              <td>
                <Link to={`/courses/${course.id}`}>View</Link> |
                <Link to={`/courses/edit/${course.id}`}>Edit</Link> |
                <button onClick={() => handleDelete(course.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CourseList;
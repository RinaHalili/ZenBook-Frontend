import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register"; // Import Link for navigation
import ClientList from "./components/Client/ClientList";
import ClientDetails from "./components/Client/ClientDetails";
import ClientForm from "./components/Client/ClientForm";
import InstructorList from "./components/Instructor/InstructorList";
import InstructorDetails from "./components/Instructor/InstructorDetails";
import InstructorForm from "./components/Instructor/InstructorForm";
import PaymentList from "./components/Payment/PaymentList";
import PaymentDetails from "./components/Payment/PaymentDetails";
import PaymentForm from "./components/Payment/PaymentForm";
import SessionList from "./components/Session/SessionList";
import SessionDetails from "./components/Session/SessionDetails";
import SessionForm from "./components/Session/SessionForm"; // Import Link for navigation
import CourseList from "./components/Course/CourseList";
import CourseDetails from "./components/Course/CourseDetails";
import CourseForm from "./components/Course/CourseForm";
import { isAuthenticated } from "./services/api";

const Home = () => <h2>Home Page</h2>; // Placeholder Home component

function App() {
  const [authenticated, setAuthenticated] = useState(isAuthenticated());

  // get firstname from localstorage and how it on h2 Hello {firstname}
  const firstName = localStorage.getItem("firstName");
  const lastName = localStorage.getItem("lastName");
  const fullName = `${firstName} ${lastName}`;
  const greeting = `Hello ${fullName}`;

  useEffect(() => {
    const handleStorageChange = () => {
      setAuthenticated(isAuthenticated());
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <Router>
      {authenticated && (
        <nav
          style={{
            marginBottom: "20px",
            padding: "10px",
            backgroundColor: "#f0f0f0",
          }}
        >
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "flex",
              gap: "15px",
            }}
          >
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/clients">Clients</Link>
            </li>
            <li>
              <Link to="/courses">Courses</Link>
            </li>
            <li>
              <Link to="/instructors">Instructors</Link>
            </li>
            <li>
              <Link to="/payments">Payments</Link>
            </li>
            <li>
              <Link to="/sessions">Sessions</Link>
            </li>
            {/* Add a logout link here later */}
            <li>
              <Link
                to="/login"
                onClick={() => {
                  localStorage.removeItem("authToken");
                  localStorage.removeItem("firstName");
                  localStorage.removeItem("lastName");
                  setAuthenticated(false);
                }}
              >
                Logout
              </Link>
            </li>
          </ul>
        </nav>
      )}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/clients"
          element={
            authenticated ? <ClientList /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/clients/:id"
          element={
            authenticated ? <ClientDetails /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/clients/new"
          element={
            authenticated ? <ClientForm /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/clients/edit/:id"
          element={
            authenticated ? <ClientForm /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/courses"
          element={
            authenticated ? <CourseList /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/courses/:id"
          element={
            authenticated ? <CourseDetails /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/courses/new"
          element={
            authenticated ? <CourseForm /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/courses/edit/:id"
          element={
            authenticated ? <CourseForm /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/instructors"
          element={
            authenticated ? (
              <InstructorList />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/instructors/:id"
          element={
            authenticated ? (
              <InstructorDetails />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/instructors/new"
          element={
            authenticated ? (
              <InstructorForm />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/instructors/edit/:id"
          element={
            authenticated ? (
              <InstructorForm />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/payments"
          element={
            authenticated ? <PaymentList /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/payments/:id"
          element={
            authenticated ? (
              <PaymentDetails />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/payments/new"
          element={
            authenticated ? <PaymentForm /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/payments/edit/:id"
          element={
            authenticated ? <PaymentForm /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/sessions"
          element={
            authenticated ? <SessionList /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/sessions/:id"
          element={
            authenticated ? (
              <SessionDetails />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/sessions/new"
          element={
            authenticated ? <SessionForm /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/sessions/edit/:id"
          element={
            authenticated ? <SessionForm /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/"
          element={authenticated ? <Home /> : <Navigate to="/login" replace />}
        />
      </Routes>
    </Router>
  );
}

export default App;

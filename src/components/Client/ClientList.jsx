import React, { useState, useEffect } from "react";
import { getClients, deleteClient } from "../../services/api";
import { Link, useNavigate } from "react-router-dom";

const ClientList = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClients = async () => {
      setLoading(true);
      try {
        const response = await getClients();
        console.log("Fetched clients:", response);
        setClients(response);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this client?")) {
      try {
        await deleteClient(id);
        setClients(clients.filter((client) => client.id !== id));
        // Optionally display a success message
        alert("Client deleted successfully!");
      } catch (err) {
        console.error("Error deleting client:", err);
        // Optionally display an error message
        alert("Error deleting client.");
      }
    }
  };

  if (loading) {
    return <p>Loading clients...</p>;
  }

  if (error) {
    return <p>Error loading clients: {error.message}</p>;
  }

  return (
    <div>
      <h2>Clients</h2>{" "}
      <table>
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.id}>
              <td>{client.fullName}</td>
              <td>{client.email}</td>
              <td>{client.phoneNumber}</td>
              <td>
                <Link to={`/clients/${client.id}`}>View</Link> |{" "}
                <Link to={`/clients/edit/${client.id}`}>Edit</Link> |{" "}
                <button onClick={() => console.log("Delete client", client.id)}>
                  Delete
                </button>{" "}
                {/* Placeholder for delete */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/clients/new">Add New Client</Link>
    </div>
  );
};

export default ClientList;

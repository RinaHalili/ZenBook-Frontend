import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getClientById } from "../../services/api";

// Add state for loading and error
function ClientDetails() {
  const { id } = useParams();
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClient = async () => {
      try {
        setLoading(true);
        const data = await getClientById(id);
        setClient(data);
        console.log("Client data:", data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch client details.");
        console.error("Error fetching client:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchClient();
  }, [id]);

  // Display a loading message while fetching data
  if (loading) {
    return <div>Loading client details...</div>;
  }

  // Display an error message if fetching fails
  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!client) {
    return <div>Client not found.</div>;
  }

  return (
    <div>
      <h2>Client Details</h2>
      <div>
        <strong>ID:</strong> {client.id}
      </div>
      <div>
        <strong>Full Name:</strong> {client.fullName}
      </div>
      <div>
        <strong>Email:</strong> {client.email}
      </div>
      <div>
        <strong>Phone Number:</strong> {client.phoneNumber}
      </div>
      <div>
        <strong>Date of Birth:</strong>{" "}
        {client.dateOfBirth
          ? new Date(client.dateOfBirth).toLocaleDateString()
          : "N/A"}
      </div>
      <div>
        <strong>Address:</strong> {client.address}
      </div>
      <div>
        <strong>Profile Picture URL:</strong>{" "}
        {client.profilePictureUrl || "N/A"}
      </div>
      <div>
        <strong>Active:</strong> {client.isActive ? "Yes" : "No"}
      </div>
      {/* Add more client properties as needed */}
    </div>
  );
}

export default ClientDetails;

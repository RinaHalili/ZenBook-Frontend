jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createClient, getClientById, updateClient } from '../../services/api';

const ClientForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [client, setClient] = useState({
    id: 0,

    fullName: '',
    email: '',
    phoneNumber: '',
    dateOfBirth: '',
    address: '',
    isActive: true,
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchClient = async () => {
        try {
          const data = await getClientById(id);
          setClient(data);
          setLoading(false);
        } catch (err) {
          setError("Failed to fetch client details.");
          setLoading(false);
        }
      };
      fetchClient();
    } else {
      setLoading(false);
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setClient({
      ...client,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);
    setSuccessMessage(null);
    try {
      if (id) {
        await updateClient(id, client);
        setSuccessMessage('Client updated successfully!');
      } else {
        await createClient(client);
        setSuccessMessage('Client created successfully!');
      }
      // Optionally redirect after a short delay or on user action
      // navigate('/clients'); 
    } catch (err) {
      setSubmitError("Failed to save client.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
 return <div>Error: {error}</div>;
  }

  // Display submit success or error messages
  if (successMessage) {
    return <div>{successMessage} <button onClick={() => navigate('/clients')}>Go to Clients</button></div>;
  }

  if (submitError) {
 return <div>Error: {submitError}</div>;
  }

  return (
    <div>
      <h2>{id ? 'Edit Client' : 'Create New Client'}</h2>
 <form onSubmit={handleSubmit} className="form">
 <div className="form-group">
 <label htmlFor="fullName">Full Name:</label>
 <input
 type="text"
 id="fullName"
 name="fullName"
 value={client.fullName}
 onChange={handleChange}
 required
 className="form-control"
 />
 </div>
 <div className="form-group">
 <label htmlFor="email">Email:</label>
 <input
 type="email"
 id="email"
 name="email"
 value={client.email}
 onChange={handleChange}
 className="form-control"
 />
 </div>
 <div className="form-group">
 <label htmlFor="phoneNumber">Phone Number:</label>
 <input
 type="text"
 id="phoneNumber"
 name="phoneNumber"
 value={client.phoneNumber}
 onChange={handleChange}
 className="form-control"
 />
 </div>
 <div className="form-group">
 <label htmlFor="dateOfBirth">Date of Birth:</label>
 <input
 type="date"
 id="dateOfBirth"
 name="dateOfBirth"
 value={client.dateOfBirth ? client.dateOfBirth.split('T')[0] : ''} // Format date for input
 onChange={handleChange}
 className="form-control"
 />
 </div>
 <div className="form-group">
 <label htmlFor="address">Address:</label>
 <input
            type="text"
            id="address"
            name="address"
            value={client.address}
 onChange={handleChange}
 className="form-control"
          />
        </div>
 <div className="form-group form-check">
 <input
            type="checkbox"
           id="isActive"
            name="isActive"
            checked={client.isActive}
            onChange={handleChange}
 className="form-check-input"
 />
 <label htmlFor="isActive" className="form-check-label">Active:</label>
 </div>

 <button type="submit" disabled={submitting}>{submitting ? 'Saving...' : (id ? 'Update Client' : 'Create Client')}</button>
      </form>
    </div>
  );
};

export default ClientForm;
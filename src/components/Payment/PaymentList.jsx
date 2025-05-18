jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPayments, deletePayment } from '../../services/api';

function PaymentList() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const response = await getPayments();
      setPayments(response.data);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deletePayment(id);
      setPayments(payments.filter(payment => payment.id !== id));
    } catch (err) {
      console.error('Error deleting payment:', err);
    }
  };

  if (loading) {
    return <div>Loading payments...</div>;
  }

  if (error) {
    return <div>Error loading payments: {error.message}</div>;
  }

  return (
    <div>
      <h2>Payments List</h2>
      <Link to="/payments/new">Add New Payment</Link>
      <table className="data-table">
        <thead>
          <tr>
            <th>Client ID</th>
            <th>Amount</th>
            <th>Payment Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {payments.map(payment => (
            <tr key={payment.id}>
              <td>{payment.clientId}</td>
              <td>{payment.amount}</td>
              <td>{new Date(payment.paymentDate).toLocaleDateString()}</td>
              <td>
                <Link to={`/payments/${payment.id}`}>View</Link>
                {' | '}
                <Link to={`/payments/edit/${payment.id}`}>Edit</Link>
                {' | '}
                <button onClick={() => handleDelete(payment.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PaymentList;
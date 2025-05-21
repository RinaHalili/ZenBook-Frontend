
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPaymentById } from '../../services/api';

function PaymentDetails() {
  const { id } = useParams();
  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPayment = async () => {
      try {
        setLoading(true);
        const data = await getPaymentById(id);
        setPayment(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch payment details.');
        console.error('Error fetching payment details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPayment();
  }, [id]);

  if (loading) {
    return <div>Loading payment details...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!payment) {
    return <div>Payment not found.</div>;
  }

  return (
    <div>
      <h2>Payment Details</h2>
      <p><strong>Client ID:</strong> {payment.clientId}</p>
      <p><strong>Amount:</strong> {payment.amount}</p>
      <p><strong>Payment Date:</strong> {new Date(payment.paymentDate).toLocaleString()}</p>
      <p><strong>Payment Method:</strong> {payment.paymentMethod}</p>
      <p><strong>Successful:</strong> {payment.isSuccessful ? 'Yes' : 'No'}</p>
      <p><strong>Refunded:</strong> {payment.isRefunded ? 'Yes' : 'No'}</p>
      {/* Add more payment details as needed */}
    </div>
  );
}

export default PaymentDetails;
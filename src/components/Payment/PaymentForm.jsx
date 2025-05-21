
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPaymentById, createPayment, updatePayment } from '../../services/api';

const PaymentForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [payment, setPayment] = useState({
    clientId: '',
    amount: '',
    paymentDate: '',
    paymentMethod: '',
    isSuccessful: false,
    isRefunded: false,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchPayment = async () => {
        try {
          const data = await getPaymentById(id);
          setPayment({
            ...data,
            paymentDate: data.paymentDate ? data.paymentDate.split('T')[0] : '', // Format date for input
          });
        } catch (err) {
          setError(err);
        } finally {
          setLoading(false);

        }
      };
      fetchPayment();
    } else {
      setLoading(false);
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPayment((prevPayment) => ({
      ...prevPayment,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await updatePayment(id, payment);
      } else {
        await createPayment(payment);
      }
      navigate('/payments');
    } catch (err) {
      setError(err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="form-container">
      <h2>{id ? 'Edit Payment' : 'Create Payment'}</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="clientId">Client ID:</label>
          <input
            type="number"
            id="clientId"
            name="clientId"
 value={payment.clientId || ''}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            id="amount"
            name="amount"
 value={payment.amount || ''}
            onChange={handleChange}
            step="0.01"
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="paymentDate">Payment Date:</label>
          <input
            type="date"
            id="paymentDate"
            name="paymentDate"
 value={payment.paymentDate}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="paymentMethod">Payment Method:</label>
          <input
            type="text"
            id="paymentMethod"
            name="paymentMethod"
            value={payment.paymentMethod}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div>
          <label htmlFor="isSuccessful">Successful:</label>
          <input
            type="checkbox"
            id="isSuccessful"
            name="isSuccessful"
            checked={payment.isSuccessful}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="isRefunded">Refunded:</label>
          <input
            type="checkbox"
            id="isRefunded"
            name="isRefunded"
            checked={payment.isRefunded}
            onChange={handleChange}
          />

        </div>
        <button type="submit" className="btn btn-primary">{id ? 'Update Payment' : 'Create Payment'}</button>
      </form>
    </div>
  );
};

export default PaymentForm;
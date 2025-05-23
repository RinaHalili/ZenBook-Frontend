import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:7043/api',
});

api.interceptors.request.use(
  (config) => {
    const tenant = localStorage.getItem('tenant');
    console.log('Tenant ID:', tenant);
    if (tenant) {
      config.headers['X-Tenant-ID'] = tenant;
    }
    const token = localStorage.getItem('authToken'); // Replace 'authToken' with your actual token key
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const isAuthenticated = () => {
  const token = localStorage.getItem('authToken'); // Replace 'authToken' with your actual token key
  
  return !!token; // Returns true if the token exists, false otherwise
};


export const login = async (username, password, tenantId) => {
  const response = await api.post('/Auth/login', { username, password, tenantId });
  return response.data;
};

export const register = async (firstName, lastName, username, email, password, tenantId) => {
  const response = await api.post('/Auth/register', { firstName, lastName, username, email, password, tenantId });
  return response.data;
};

export const getClients = async () => {
  const response = await api.get('/clients');
  return response.data;
};

export const getClientById = async (id) => {
  const response = await api.get(`/clients/${id}`);
  return response.data;
};

export const createClient = async (clientData) => {
  console.log('Client data:', clientData);
  const response = await api.post('/clients', clientData);
  console.log('Client created:', response.data);
  return response.data;
};

export const updateClient = async (id, clientData) => {
  const response = await api.put(`/clients/${id}`, clientData);
  return response.data;
};

export const deleteClient = async (id) => {
  const response = await api.delete(`/clients/${id}`);
  return response.data;
};

export const getCourses = async () => {
  const response = await api.get('/Courses');
  return response.data;
};

export const getCourseById = async (id) => {
  const response = await api.get(`/Courses/${id}`);
  return response.data;
};

export const createCourse = async (courseData) => {
  const response = await api.post('/Courses', courseData);
  return response.data;
};

export const updateCourse = async (id, courseData) => {
  const response = await api.put(`/Courses/${id}`, courseData);
  return response.data;
};

export const deleteCourse = async (id) => {
  const response = await api.delete(`/Courses/${id}`);
  return response.data;
};

export const getInstructors = async () => {
  const response = await api.get('/Instructors');
  return response.data;
};

export const getInstructorById = async (id) => {
  const response = await api.get(`/Instructors/${id}`);
  return response.data;
};

export const createInstructor = async (instructorData) => {
  const response = await api.post('/Instructors', instructorData);
  return response.data;
};

export const updateInstructor = async (id, instructorData) => {
  const response = await api.put(`/Instructors/${id}`, instructorData);
  return response.data;
};

export const deleteInstructor = async (id) => {
  const response = await api.delete(`/Instructors/${id}`);
  return response.data;
};

export const getPayments = async () => {
  const response = await api.get('/Payments');
  return response.data;
};

export const getPaymentById = async (id) => {
  const response = await api.get(`/Payments/${id}`);
  return response.data;
};

export const createPayment = async (paymentData) => {
  const response = await api.post('/Payments', paymentData);
  return response.data;
};

export const updatePayment = async (id, paymentData) => {
  const response = await api.put(`/Payments/${id}`, paymentData);
  return response.data;
};

export const deletePayment = async (id) => {
  const response = await api.delete(`/Payments/${id}`);
  return response.data;
};

export const getSessions = async () => {
  const response = await api.get('/Sessions');
  return response.data;
};

export const getSessionById = async (id) => {
  const response = await api.get(`/Sessions/${id}`);
  return response.data;
};

export const createSession = async (sessionData) => {
  const response = await api.post('/Sessions', sessionData);
  return response.data;
};

export const updateSession = async (id, sessionData) => {
  const response = await api.put(`/Sessions/${id}`, sessionData);
  return response.data;
};

export const deleteSession = async (id) => {
  const response = await api.delete(`/Sessions/${id}`);
  return response.data;
};

export default api;
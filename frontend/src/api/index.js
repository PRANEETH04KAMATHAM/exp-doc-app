const API_URL = import.meta.env.VITE_API_URL;

async function fetchAPI(url, options = {}) {
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'API call failed');
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

export const login = async (email, password, userType) => {
    const response = await fetch(`${API_URL}/${userType}s/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
  
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Login failed');
    }
  
    return response.json();
  };

export const register = async (userData, userType) => {
  console.log('Registering user as', userType);
  console.log('User data:', Object.fromEntries(userData));
  try {
    const response = await fetch(`${API_URL}/${userType}s/register`, {
      method: 'POST',
      body: userData
    });
    const data = await response.json();
    console.log('Server response:', response.status, data);
    if (!response.ok) {
      throw new Error(data.message || 'Registration failed');
    }
    return data;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

export const getProfile = async (userType, token) => {
  return fetchAPI(`${API_URL}/${userType}/profile`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
};

export const updateProfile = async (userType, token, userData) => {
  return fetchAPI(`${API_URL}/${userType}/profile`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  });
};

export const getDoctors = async () => {
  return fetchAPI(`${API_URL}/doctors`);
};

export const getDoctorById = async (id) => {
  return fetchAPI(`${API_URL}/doctors/${id}`);
};

export const createAppointment = async (token, appointmentData) => {
  return fetchAPI(`${API_URL}/appointments`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(appointmentData)
  });
};

export const getAppointments = async (token, userType) => {
  return fetchAPI(`${API_URL}/appointments`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
};
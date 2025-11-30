import axios from 'axios';

const API_BASE = 'http://localhost:5000/api';

// Get token from localStorage
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };
};

export const familyAPI = {
  // Get family dashboard data
  getDashboard: async () => {
    const response = await axios.get(`${API_BASE}/family/dashboard`, getAuthHeaders());
    return response.data;
  },

  // Get family profile
  getProfile: async () => {
    const response = await axios.get(`${API_BASE}/family/me`, getAuthHeaders());
    return response.data;
  },

  // Update family profile
  updateProfile: async (profileData: any) => {
    const response = await axios.put(`${API_BASE}/family/me`, profileData, getAuthHeaders());
    return response.data;
  },

  // Search caregivers
  searchCaregivers: async (filters: any) => {
    const response = await axios.get(`${API_BASE}/family/caregivers/search`, {
      ...getAuthHeaders(),
      params: filters,
    });
    return response.data;
  },

  // Get caregiver profile
  getCaregiverProfile: async (caregiverId: string) => {
    const response = await axios.get(`${API_BASE}/family/caregivers/${caregiverId}`, getAuthHeaders());
    return response.data;
  },
};

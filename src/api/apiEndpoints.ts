import axios from 'axios';

// const baseUrl = env.REACT_APP_API_BASE_URL;

const api = axios.create({
	baseURL: 'https://demo.jobsoid.com/api/v1',
});

const API_ENDPOINTS = {
	getAllJobs: '/jobs',
	departments: '/departments',
	locations: '/locations',
	functions: '/functions',
};

export { API_ENDPOINTS, api };

import axios from 'axios'
const baseURL = import.meta.env.VITE_API_BASE_URL
const apiKey = import.meta.env.VITE_API_KEY

const endpointApi = axios.create({
  baseURL,
  timeout: 5000,
  headers: { 'X-Api-Key': apiKey }
})

export default endpointApi

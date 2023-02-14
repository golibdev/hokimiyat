import axios from 'axios';
import queryString from 'query-string';
const baseURL = "https://api.tezzkor.com/api/v1/"

const multipartPrivateClient = axios.create({
   baseURL,
   paramsSerializer: {
      encode: params => queryString.stringify(params)
   }
})

multipartPrivateClient.interceptors.request.use(async config => {
   return {
      ...config,
      headers: {
         "Content-Type": "application/json",
         "Content-Type": "multipart",
         "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
   }
})

multipartPrivateClient.interceptors.response.use((response) => {
   if (response && response.data) return response.data
   return response
}, (err) => {
   throw err.response.data;
})

export default multipartPrivateClient;
import publicClient from '../client/public.client';
import multipartPrivateClient from '../client/multipart.private.client';

const districtEndpoints = {
   getAll: "district",
   getOne: (id) => `district/${id}`,
   create: "district/create"
}

const districtApi = {
   getAll: async () => {
      try {
         const response = await publicClient.get(
            districtEndpoints.getAll
         )

         return { response }
      } catch (err) {
         return { err }
      }
   },
   getOne: async (id) => {
      try {
         const response = await publicClient.get(
            districtEndpoints.getOne(id)
         )

         return { response };
      } catch (err) {
         return { err }
      }
   },
   create: async (params) => {
      try {
         const response = await multipartPrivateClient.post(
            districtEndpoints.create,
            params
         )

         return { response }
      } catch (err) {
         return { err }
      }
   }
}

export default districtApi;
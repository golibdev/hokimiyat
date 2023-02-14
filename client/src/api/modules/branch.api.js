import publicClient from '../client/public.client';
import privateClient from '../client/private.client';

const branchEndpoints = {
   getAll: "branch",
   getOne: (id) => `branch/${id}`,
   create: "branch/create"
}

const branchApi = {
   getAll: async () => {
      try {
         const response = await publicClient.get(
            branchEndpoints.getAll
         )

         return { response }
      } catch (err) {
         return { err }
      }
   },
   getOne: async (id) => {
      try {
         const response = await publicClient.get(
            branchEndpoints.getOne(id)
         )

         return { response };
      } catch (err) {
         return { err }
      }
   },
   create: async (params) => {
      try {
         const response = await privateClient.post(
            branchEndpoints.create,
            params
         )

         return { response }
      } catch (err) {
         return { err }
      }
   }
}

export default branchApi;
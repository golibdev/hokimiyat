import publicClient from '../client/public.client';
import privateClient from '../client/private.client';

const internalBranchEndpoints = {
   getAll: "internal-branch",
   getOne: (id) => `internal-branch/${id}`,
   create: "internal-branch/create"
}

const internalBranchApi = {
   getAll: async () => {
      try {
         const response = await publicClient.get(
            internalBranchEndpoints.getAll
         )

         return { response }
      } catch (err) {
         return { err }
      }
   },
   getOne: async (id) => {
      try {
         const response = await publicClient.get(
            internalBranchEndpoints.getOne(id)
         )

         return { response };
      } catch (err) {
         return { err }
      }
   },
   create: async (params) => {
      try {
         const response = await privateClient.post(
            internalBranchEndpoints.create,
            params
         )

         return { response }
      } catch (err) {
         return { err }
      }
   }
}

export default internalBranchApi;
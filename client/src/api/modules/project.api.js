import publicClient from '../client/public.client';
import multipartPrivateClient from '../client/multipart.private.client'
import privateClient from '../client/private.client';

const projectEndpoints = {
   getAll: "project",
   getOne: (id) => `project/${id}`,
   create: "project/create",
   filterBranchAndInternalBranch: (branchId, internalBranchId) => `project/filter/${branchId}/${internalBranchId}`,
   filterBranchInternalBranchAndDistrict: (branchId, internalBranchId, districtId) => `project/filter-district/${districtId}/${branchId}/${internalBranchId}`
}

const projectApi = {
   getAll: async () => {
      try {
         const response = await publicClient.get(
            projectEndpoints.getAll
         )

         return { response }
      } catch (err) {
         return { err }
      }
   },
   getBranchAndInternalBranch: async ({ branchId, internalBranchId }) => {
      try {
         const response = await publicClient.get(
            projectEndpoints.filterBranchAndInternalBranch(branchId, internalBranchId)
         )

         return { response }
      } catch (err) {
         return { err }
      }
   },
   getBranchInternalBranchAndDistrict: async ({ branchId, internalBranchId, districtId }) => {
      try {
         const response = await publicClient.get(
            projectEndpoints.filterBranchInternalBranchAndDistrict(branchId, internalBranchId, districtId)
         )

         return { response }
      } catch (err) {
         return { err }
      }
   },
   getOne: async (id) => {
      try {
         const response = await publicClient.get(
            projectEndpoints.getOne(id)
         )

         return { response };
      } catch (err) {
         return { err }
      }
   },
   create: async (params) => {
      try {
         const response = await multipartPrivateClient.post(
            projectEndpoints.create,
            params
         )

         return { response }
      } catch (err) {
         return { err }
      }
   },
   delete: async ({ projectId }) => {
      try {
         const response = await privateClient.delete(projectEndpoints.getOne(projectId))

         return { response };
      } catch (err) {
         return { err }
      }
   }
}

export default projectApi;
import publicClient from '../client/public.client';

const userEndpoints = {
   sigin: "user/signin",
   signup: "user/signup",
}

const userApi = {
   sigin: async ({ username, password }) => {
      try {
         const response = await publicClient.post(
            userEndpoints.sigin,
            { username, password}
         )

         return { response }
      } catch (err) {
         return { err }
      }
   }
}

export default userApi;
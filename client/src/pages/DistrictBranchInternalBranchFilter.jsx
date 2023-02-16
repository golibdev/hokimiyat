import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast } from'react-toastify'
import projectApi from '../api/modules/project.api';

const DistrictBranchInternalBranchFilter = () => {
   const { branchId, internalBranchId, districtId } = useParams()
   const [projects, setProjects] = useState([]);

   const getData = async () => {
      const { response, err } = await projectApi.getBranchInternalBranchAndDistrict({ internalBranchId, branchId, districtId });

      if (response) {
         setProjects(response.projects)
      }

      if (err) toast.warning(err.messge);
   }

   useEffect(() => {
      getData()
   }, [])
   
   return (
      <div className='container mt-5'>
         <h2 className='text-center fw-bold display-1 mb-3'>Loyihalar</h2>
         <div className="row g-4">
            {projects.map(item => (
               <div data-aos="zoom-in" data-aos-duration="1500" className="col-12" key={item._id}>
                  <Link className='w-100 btn btn-hover btn-font'>
                     {item.name}
                  </Link>
               </div>
            ))}
         </div>
      </div>
   )
}

export default DistrictBranchInternalBranchFilter
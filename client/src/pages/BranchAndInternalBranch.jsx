import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from'react-toastify'
import projectApi from '../api/modules/project.api';
import { back } from '../utils/back';

const BranchAndInternalBranch = () => {
   const { branchId, internalBranchId, districtId } = useParams()
   const [projects, setProjects] = useState([]);
   const navigate = useNavigate()

   const getData = async () => {
      const { response, err } = await projectApi.getBranchAndInternalBranch({ internalBranchId, branchId, districtId });

      if (response) {
         setProjects(response.projects)
         console.log(response.projects);
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
               <div className="col-lg-10 offset-lg-1" data-aos="zoom-in" data-aos-duration="1500" key={item._id}>
                  <Link to={`/project/${item._id}`} className='w-100 btn btn-hover btn-font d-flex align-items-center justify-content-center'>
                     {item.name}
                  </Link>
               </div>
            ))}
         </div>

         <a href="#" onClick={() => back(navigate)} className="main-btn btn-hover btn">
            Ortga
         </a>
      </div>
   )
}

export default BranchAndInternalBranch
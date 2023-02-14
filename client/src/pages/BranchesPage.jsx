import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import branchApi from '../api/modules/branch.api';
import Loader from '../components/Loader';
import { Link, useNavigate } from 'react-router-dom'
import { back } from '../utils/back';
 
const BranchesPage = () => {
   const [branches, setBranches] = useState([]);
   const [loading, setLoading] = useState(false);
   const navigate = useNavigate()

   const getBranches = async () => {
      setLoading(true);
      const { response, err } = await branchApi.getAll();
      setLoading(false);

      if (response) {
         setBranches(response.branches);
      }

      if (err) {
         toast.error(err.message);
      }
   }

   useEffect(() => {
      getBranches();
   }, [])

   return (
      loading ? <div style={{ height: '100vh' }} className="d-flex align-items-center justify-content-center">
         <Loader/>
      </div> : (
         <div style={{ height: '100vh' }} className='d-flex align-items-center container'>
            <div className="row g-5">
               {branches.map(item => (
                  <div className="col-lg-12" key={item._id}>
                     <Link style={{ fontSize: '50px'}} to={`/branches/${item._id}`} id="btn-hover" className="btn-hover btn btn-lg text-uppercase fw-bold me-5 w-100">
                        <span>{item.name}</span>
                     </Link>
                  </div>
               ))}
            </div>

            <a href="#" onClick={() => back(navigate)} className="main-btn btn-hover btn">
               Ortga
            </a>
         </div>
      )
   )
}

export default BranchesPage
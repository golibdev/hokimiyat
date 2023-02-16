import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import internalBranch from '../api/modules/internalBranch.api';
import Loader from '../components/Loader';
import { Link, useNavigate, useParams } from 'react-router-dom'
import { back } from '../utils/back';
 
const InternalBranches = () => {
   const [internalBranches, setInternalBranches] = useState([]);
   const [loading, setLoading] = useState(false);
   const { branchId } = useParams();
   const navigate = useNavigate();

   const getBranches = async () => {
      setLoading(true);
      const { response, err } = await internalBranch.getAll();
      setLoading(false);

      if (response) {
         setInternalBranches(response.internalBranches.reverse());
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
               {internalBranches.map(item => (
                  <div data-aos="zoom-in" data-aos-duration="1500" className="col-lg-12" key={item._id}>
                     <Link style={{ fontSize: '50px'}} to={`/branches/${branchId}/internal-branches/${item._id}`} id="btn-hover" className="btn-hover btn btn-lg text-uppercase fw-bold me-5 w-100">
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

export default InternalBranches
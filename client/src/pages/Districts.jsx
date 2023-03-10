import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import districtApi from '../api/modules/district.api'
import Loader from '../components/Loader';
import { back } from '../utils/back';

const Districts = () => {
   const [districts, setDisticts] = useState([]);
   const [loading, setLoading] = useState(false);
   const navigate = useNavigate();

   const getAll = async () => {
      setLoading(true);
      const { response, err } = await districtApi.getAll();
      setLoading(false);

      if (response) {
         setDisticts(response.districts);
      }

      if (err) {
         toast.error(err.message);
      }
   }

   useEffect(() => {
      getAll();
   }, [])
  return (
      loading ? <div style={{ height: '100vh' }} className="d-flex align-items-center justify-content-center">
         <Loader/>
      </div> : (
         <>
            <div className="container mt-5 d-flex align-items-center" style={{ height: '90vh' }}>
               <div className="row g-4">
                  {districts.map(item => (
                     <div className="col-lg-3" data-aos="zoom-in" data-aos-duration="1500" key={item._id}>
                        <a style={{ fontSize: '30px', height: '100%'}} href={`/districts/${item._id}`} id="btn-hover" className="w-100 btn-hover btn btn-lg text-uppercase fw-bold p-4 d-flex align-items-center justify-content-center">
                           <span>{item.name}</span>
                        </a>
                     </div>
                  ))}
               </div>
            </div>

            <a href="#" onClick={() => back(navigate)} className="main-btn btn-hover btn">
               Ortga
            </a>
         </>
      )
  )
}

export default Districts
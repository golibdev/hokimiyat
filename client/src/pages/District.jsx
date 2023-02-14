import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import branchApi from '../api/modules/branch.api';
import Loader from '../components/Loader';
import { Link, useNavigate, useParams } from 'react-router-dom'
import { back } from '../utils/back';
import districtApi from '../api/modules/district.api';
import { Viewer, Worker } from '@react-pdf-viewer/core'
import { scrollModePlugin } from '@react-pdf-viewer/scroll-mode'
import '@react-pdf-viewer/core/lib/styles/index.css';
 
const District = () => {
   const scrollModePluginInstance = scrollModePlugin();
   const { districtId } = useParams()
   const [branches, setBranches] = useState([]);
   const [district, setDistrict] = useState();
   const [loading, setLoading] = useState(false);
   const navigate = useNavigate();

   const getDistrictData = async () => {
      const { response, err } = await districtApi.getOne(districtId);

      if (response) {
         setDistrict(response.district)
      }

      if (err) {
         toast.message(err.message);
      }
   }

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
      getDistrictData()
   }, [])

   return (
      loading ? <div style={{ height: '100vh' }} className="d-flex align-items-center justify-content-center">
         <Loader/>
      </div> : (
         <div className='align-items-center container' id='district'>
            <div className="row">
               <div className="col-lg-6 align-items-center justify-content-center d-flex flex-column">
                  {branches.map(item => (
                     <div className="row mb-3 w-100">
                        <div className="col-lg-12" key={item.name}>
                           <Link style={{ fontSize: '50px'}} to={`/district/${districtId}/branches/${item._id}`} id="btn-hover" className="btn-hover btn btn-lg text-uppercase fw-bold me-5 w-100">
                              <span>{item.name}</span>
                           </Link>
                        </div>
                     </div>
                  ))}
               </div>
               <div className="col-lg-6 mt-5" style={{
                  height: '600px'
               }}>
                     <h1 className='text-center'>{district && district.name} passporti</h1>
                     <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.3.122/build/pdf.worker.min.js">
                     {loading ? <Loader/> : (
                           <Viewer 
                              fileUrl={district && district.file && `https://api.tezzkor.com${district.file}`} 
                              plugins={[
                                 scrollModePluginInstance
                              ]}
                           />
                        )}
                     </Worker>
               </div>
            </div>

            <a href="#" onClick={() => back(navigate)} className="main-btn btn-hover btn">
               Ortga
            </a>
         </div>
      )
   )
}

export default District
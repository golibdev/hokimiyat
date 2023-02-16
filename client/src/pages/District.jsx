import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import branchApi from "../api/modules/branch.api";
import Loader from "../components/Loader";
import { Link, useNavigate, useParams } from "react-router-dom";
import { back } from "../utils/back";
import districtApi from "../api/modules/district.api";
import { serverUrl } from "../constants/serverUrl";

const District = () => {
   const { districtId } = useParams();
   const [branches, setBranches] = useState([]);
   const [district, setDistrict] = useState();
   const [loading, setLoading] = useState(false);
   const [text, setText] = useState('pasporti')
   const navigate = useNavigate();

   const changePassportText = (e) => {
      e.preventDefault()
      if (text === 'pasporti') {
         setText("ko'rsatkichlari");
         return
      }
   }

   const changeExportText = (e) => {
      e.preventDefault()
      if (text == "ko'rsatkichlari") {
         setText('pasporti')
      }
   }

   const getDistrictData = async () => {
      const { response, err } = await districtApi.getOne(districtId);

      if (response) {
         setDistrict(response.district);
      }

      if (err) {
         toast.message(err.message);
      }
   };

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
   };

   useEffect(() => {
      getBranches();
      getDistrictData();
   }, [districtId]);

   return loading ? (
      <div
         style={{ height: "100vh" }}
         className="d-flex align-items-center justify-content-center"
      >
         <Loader />
      </div>
   ) : (
      <div className="align-items-center container" style={{ width: "75%" }} id="district">
         <div className="row">
            <div className="col-lg-12">
               <div className="d-flex align-items-center justify-content-between">
                  <div className="nav nav-tabs" id="nav-tab" role="tablist">
                     <button onClick={changeExportText} className="btn btn-hover me-3 active" id="nav-passport-tab" data-bs-toggle="tab" data-bs-target="#nav-passport" type="button" role="tab" aria-controls="nav-passport" aria-selected="true">Pasport</button>
                     <button onClick={changePassportText} className="btn btn-hover" id="nav-export-tab" data-bs-toggle="tab" data-bs-target="#nav-export" type="button" role="tab" aria-controls="nav-export" aria-selected="false">Ko'rsatkichlar</button>
                  </div>
                  <h1 className="text-center">
                     {district && district.name} {text}
                  </h1>
               </div>
               <div class="tab-content" id="nav-tabContent">
                  <div className="tab-pane fade show active" id="nav-passport" role="tabpanel" aria-labelledby="nav-passport-tab" tabIndex="0">
                     <img className="img-fluid mb-3 w-100" style={{ borderRadius: '10px' }} src={`${serverUrl}${district && district.passportFile}`} alt="passport" />
                  </div>
                  <div className="tab-pane fade" id="nav-export" role="tabpanel" aria-labelledby="nav-export-tab" tabIndex="0">
                     <img className="img-fluid mb-3 w-100" style={{ borderRadius: '10px' }} src={`${serverUrl}${district && district.file}`} alt="passport" />
                  </div>
               </div>
            </div>
            <div className="col-lg-12 align-items-center justify-content-center d-flex flex-column">
               <div className="row mb-3 w-100">
                  {branches.map((item) => (
                     <div className="col-lg-4" key={item._id}>
                        <Link
                           style={{ fontSize: "30px" }}
                           to={`/district/${districtId}/branches/${item._id}`}
                           id="btn-hover"
                           className="btn-hover btn text-uppercase fw-bold w-100 d-flex align-items-center justify-content-center"
                        >
                           <span>{item.name}</span>
                        </Link>
                     </div>
                  ))}
               </div>
            </div>
         </div>

         <a
            href="#"
            onClick={() => back(navigate)}
            className="main-btn btn-hover btn"
         >
            Ortga
         </a>
      </div>
   );
};

export default District;

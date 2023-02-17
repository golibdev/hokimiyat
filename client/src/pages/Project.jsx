import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import internalBranchApi from "../api/modules/internalBranch.api";
import projectApi from '../api/modules/project.api';
import branchApi from '../api/modules/branch.api';
import districtApi from '../api/modules/district.api'
import dayjs from "dayjs";
import Select from 'react-select'
import { Viewer, Worker } from '@react-pdf-viewer/core'
import { serverUrl } from '../constants/serverUrl';
import { back } from '../utils/back';
import '@react-pdf-viewer/core/lib/styles/index.css';

const Project = () => {
   const [data, setData] = useState([]);
   const [districts, setDistricts] = useState([]);
   const [branches, setBranches] = useState([]);
   const [internalBranches, setInternalBranches] = useState([]);
   const [loading, setLoading] = useState(false);

   const getDistricts = async () => {
      const { response, err } = await districtApi.getAll();

      if (response) {
         setDistricts(response.districts)
      }

      if (err) {
         toast.err(err.message);
      }
   }

   const getBranches = async () => {
      const { response, err } = await branchApi.getAll();

      if (response) {
         setBranches(response.branches)
      }

      if (err) {
         toast.err(err.message);
      }
   }

   const getInternalBranches = async () => {
      const { response, err } = await internalBranchApi.getAll();

      if (response) {
         setInternalBranches(response.internalBranches)
      }

      if (err) {
         toast.err(err.message);
      }
   }
   
   const getAll = async () => {
      setLoading(true);
      const { response, err } = await projectApi.getAll();
      setLoading(false);

      if (response) {
         setData(response.projects)
      }

      if (err) {
         toast.error(err.message);
      }
   };

   useEffect(() => {
      getAll();
      getBranches();
      getDistricts();
      getInternalBranches()
   }, []);

   const districtsOptions = districts.map(item => ({
      value: item._id,
      label: item.name
   }))

   const branchesOptions = branches.map(item => ({
      value: item._id,
      label: item.name
   }))

   const internalBranchesOptions = internalBranches.map(item => ({
      value: item._id,
      label: item.name
   }))

   const deleteHandler = async (projectId) => {
      const isClick = window.confirm("Rostdan ham o'chirmoqchimisz!");

      if (isClick) {
         const { response, err } = await projectApi.delete({ projectId });

         if (response) {
            toast.success("Muvaffaqqiyatli o'chirildi!")
            getAll();
         }

         if (err) {
            toast.error(err)
         }
      }
   }

   return (
      <div className="row mt-5">
         <div className="d-flex align-items-center justify-content-between">
            <h2 className="mb-3">Loyihalar</h2>
            <button
               data-bs-toggle="modal"
               data-bs-target="#add"
               className="btn btn-primary btn-sm"
            >
               Loyiha qo'shish
            </button>
            <Add 
               getAll={getAll} 
               districtsOptions={districtsOptions}
               branchesOptions={branchesOptions}
               internalBranchesOptions={internalBranchesOptions}
            />
         </div>
         <div className="table-responsive">
            <table className="table text-center table-bordered table-hover table-striped">
               <thead>
                  <tr>
                     <th>#</th>
                     <th>Nomi</th>
                     <th>Tuman</th>
                     <th>Soha</th>
                     <th>Yo'nalish</th>
                     <th>Yaratilgan vaqti</th>
                     <th>O'chirish</th>
                     <th>Tahrirlash</th>
                  </tr>
               </thead>
               <tbody>
                  {data.map((item, index) => (
                     <tr key={item._id}>
                        <td>{index + 1}</td>
                        <td>{item.name}</td>
                        <td>{item.district.name}</td>
                        <td>{item.branch.name}</td>
                        <td>{item?.internalBranch.name}</td>
                        <td>
                           {dayjs(item.createdAt).format("DD.MM.YYYY HH:mm")}
                        </td>
                        <td>
                           <button onClick={() => {
                              deleteHandler(item._id)
                           }} className="btn btn-danger">
                              <i className="bi bi-trash"></i>
                           </button>
                        </td>
                        <td>
                           <button 
                              className="btn btn-secondary" 
                              data-bs-toggle="modal" 
                              data-bs-target={`#update${item._id}`}
                           >
                              <i className="bi bi-pen"></i>
                           </button>
                           <Update projectId={item._id} file={item.file} />
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
   );
};

const Add = ({ getAll, districtsOptions, internalBranchesOptions, branchesOptions }) => {
   const [name, setName] = useState("");
   const [file, setFile] = useState('')
   const [district, setDistrict] = useState(null);
   const [branch, setBranch] = useState(null);
   const [internalBranch, setInternalBranch] = useState(null);

   const add = async (e) => {
      e.preventDefault();
      const formData = new FormData(); 

      formData.append('name', name.trim())
      formData.append('file', file)
      formData.append('district', district.value)
      formData.append('branch', branch.value)
      formData.append('internalBranch', internalBranch.value)
      const { response, err } = await projectApi.create(formData);

      if (response) {
         toast.success(response.message);
         getAll();
         setName("");
         return;
      }

      if (err) {
         console.log(err)
         toast.error(err.message);
      }
   };

   return (
      <div
         className="modal fade"
         id="add"
         tabIndex="-1"
         aria-labelledby="exampleModalLabel"
         aria-hidden="true"
      >
         <div className="modal-dialog">
            <div className="modal-content">
               <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">
                     Loyiha qo'shish
                  </h1>
                  <button
                     type="button"
                     className="btn-close"
                     data-bs-dismiss="modal"
                     aria-label="Close"
                  ></button>
               </div>
               <div className="modal-body">
                  <form encType="multipart/form-data" onSubmit={add}>
                     <div className="mb-3">
                        <label htmlFor="name" className="form-label">
                           Loyiha nomi
                        </label>
                        <input
                           type="text"
                           className="form-control"
                           placeholder="Loyiha nomi"
                           value={name}
                           onChange={(e) => setName(e.target.value)}
                        />
                     </div>

                     <div className="mb-3">
                        <label htmlFor="district" className="form-label">
                           Tuman
                        </label>
                        <Select
                           defaultValue={district}
                           onChange={setDistrict}
                           options={districtsOptions}
                        />
                     </div>

                     <div className="mb-3">
                        <label htmlFor="branch" className="form-label">
                           Soha
                        </label>
                        <Select
                           defaultValue={branch}
                           onChange={setBranch}
                           options={branchesOptions}
                        />
                     </div>

                     <div className="mb-3">
                        <label htmlFor="internalBranch" className="form-label">
                           Yo'nalish
                        </label>
                        <Select
                           defaultValue={internalBranch}
                           onChange={setInternalBranch}
                           options={internalBranchesOptions}
                        />
                     </div>

                     <div className="mb-3">
                        <label htmlFor="file" className="form-label">
                           Fayl
                        </label>
                        <input
                           type="file"
                           className="form-control"
                           onChange={(e) => setFile(e.target.files[0])}
                        />
                     </div>

                     <button className="btn btn-primary">Qo'shish</button>
                  </form>
               </div>
               <div className="modal-footer">
                  <button
                     type="button"
                     className="btn btn-danger"
                     data-bs-dismiss="modal"
                  >
                     Yopish
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
};

const Update = ({ projectId, file }) => {

   const [name, setName] = useState('')

   const updateHandler = async () => {

      const { response, err } = await projectApi.update({ projectId, name });

      if (response) {
         toast.success("Muvaffaqqiyatli yangilandi");
         setTimeout(() => {
            window.location.reload();
         }, 500)
      }

      if (err) {
         toast.error(err)
      }
   }

   return (
      <>
         <div
         className="modal fade"
         id={`update${projectId}`}
         tabIndex="-1"
         aria-labelledby="exampleModalLabel"
         aria-hidden="true"
      >
            <div className="modal-dialog modal-xl">
               <div className="modal-content">
                  <div className="modal-header">
                     <h1 className="modal-title fs-5" id="exampleModalLabel">
                        Loyiha nomi tahrirlash
                     </h1>
                     <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                     ></button>
                  </div>
                  <div className="modal-body">
                     <form encType="multipart/form-data" onSubmit={updateHandler}>
                        <div className="mb-3">
                           <label htmlFor="name" className="form-label d-block text-start">
                              Loyiha nomi
                           </label>
                           <input
                              type="text"
                              className="form-control"
                              placeholder="Loyiha nomi"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                           />
                        </div>

                        <button className="mb-4 btn btn-success d-block">Tahrirlash</button>

                        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.3.122/build/pdf.worker.min.js">
                           <Viewer 
                              fileUrl={`${serverUrl}${file}`}
                           />
                        </Worker>
                     </form>
                  </div>
                  <div className="modal-footer">
                     <button
                        type="button"
                        className="btn btn-danger"
                        data-bs-dismiss="modal"
                     >
                        Yopish
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </>
   )
}

export default Project;

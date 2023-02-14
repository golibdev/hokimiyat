import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import branchApi from "../api/modules/branch.api";
import dayjs from "dayjs";

const Branch = () => {
   const [data, setData] = useState([]);
   const [loading, setLoading] = useState(false);

   const getAll = async () => {
      setLoading(true);
      const { response, err } = await branchApi.getAll();
      setLoading(false);

      if (response) {
         setData(response.branches);
      }

      if (err) {
         toast.error(err.message);
      }
   };

   useEffect(() => {
      getAll();
   }, []);

   return (
      <div className="row mt-5">
         <div className="d-flex align-items-center justify-content-between">
            <h2 className="mb-3">Sohalar</h2>
            <button
               data-bs-toggle="modal"
               data-bs-target="#add"
               className="btn btn-primary btn-sm"
            >
               Soha qo'shish
            </button>
            <Add getAll={getAll} />
         </div>
         <div className="table-responsive">
            <table className="table text-center table-bordered table-hover table-striped">
               <thead>
                  <tr>
                     <th>#</th>
                     <th>Nomi</th>
                     <th>Yaratilgan vaqti</th>
                  </tr>
               </thead>
               <tbody>
                  {data.map((item, index) => (
                     <tr key={item._id}>
                        <td>{index + 1}</td>
                        <td>{item.name}</td>
                        <td>
                           {dayjs(item.createdAt).format("DD.MM.YYYY HH:mm")}
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
   );
};

const Add = ({ getAll }) => {
   const [name, setName] = useState("");

   const add = async (e) => {
      e.preventDefault();
      const { response, err } = await branchApi.create({ name: name.trim()});

      if (response) {
         toast.success(response.message);
         getAll();
         setName("");
         return;
      }

      if (err) {
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
                     Soha qo'shish
                  </h1>
                  <button
                     type="button"
                     className="btn-close"
                     data-bs-dismiss="modal"
                     aria-label="Close"
                  ></button>
               </div>
               <div className="modal-body">
                  <form onSubmit={add}>
                     <div className="mb-3">
                        <label htmlFor="name" className="form-label">
                           Soha nomi
                        </label>
                        <input
                           type="text"
                           className="form-control"
                           placeholder="Xizmat ko'rsatish"
                           value={name}
                           onChange={(e) => setName(e.target.value)}
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

export default Branch;

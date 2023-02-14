import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { back } from '../utils/back';

const Category = () => {
   const navigate = useNavigate();
  return (
   <>
         <div className='mt-5 container d-flex justify-content-between align-items-center'>
            <img src="/assets/gerb.png" alt="gerb" style={{ width: '150px' }} />
            <h1 className='display-2 text-center fw-bold'>Qashqadaryo viloyati <br /> hokimligi</h1>
            <img src="/assets/flag.png" alt="flag" style={{ width: '200px' }} />
         </div>
         <div style={{height: '60vh'}} className="d-flex align-items-center justify-content-center">
         <div className="container text-center">
            <Link style={{ fontSize: '50px'}} to="/districts" id="btn-hover" className="btn-hover btn btn-lg text-uppercase fw-bold me-5">
               <span>Tumanlar</span>
            </Link>

            <Link style={{ fontSize: '50px'}} to="/branches" id="btn-hover" className="btn-hover btn btn-lg text-uppercase fw-bold">
               <span>Sohalar</span>
            </Link>
         </div>

         <a href="#" onClick={() => back(navigate)} className="main-btn btn-hover btn">
            Ortga
         </a>
      </div>
   </>
  )
}

export default Category
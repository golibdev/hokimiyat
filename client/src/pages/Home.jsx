import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
   <>
      <div className='mt-5 container d-flex justify-content-between align-items-center'>
         <img src="/assets/gerb.png" alt="gerb" style={{ width: '150px' }} />
         <h1 className='display-2 text-center fw-bold'>Qashqadaryo viloyat <br /> hokimligi</h1>
         <img src="/assets/flag.png" alt="flag" style={{ width: '200px' }} />
      </div>
      <div style={{height: '60vh'}} className="d-flex align-items-center justify-content-center">
         <div className="container text-center">
            <Link data-aos="zoom-in" data-aos-duration="1500" style={{ fontSize: '40px'}} to="/category" id="btn-hover" className="btn-hover btn btn-lg text-uppercase fw-bold">
               <span>Qashqadaryo viloyati <br/> investitsiya loyiha takliflari</span>
            </Link>
         </div>
      </div>
   </>
  )
}

export default Home
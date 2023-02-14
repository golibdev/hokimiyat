import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import dashboard from '../constants/dashboard'
import { logout } from '../handlers/auth'

const Header = () => {
   const navigate = useNavigate();
   return (
      <nav className="navbar navbar-expand-md shadow">
         <div className="container">
            <Link className="navbar-brand" to="/dashboard">
               <img src="/assets/gerb.png" className='img-fluid' width={60} alt="logo"/>
            </Link>
            <div className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
               <div></div>
               <div></div>
               <div></div>
               <div></div>
            </div>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
               <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                  {dashboard.map(item => (
                     <li className="nav-item" key={item.id}>
                        <Link className="nav-link" to={item.route}>{item.name}</Link>
                     </li>
                  ))}
                  <li className="nav-item">
                     <a href='#' className="nav-link" onClick={() => {
                        logout(navigate)
                     }}>Chiqish</a>
                  </li>
               </ul>
            </div>
         </div>
      </nav>
   )
}

export default Header
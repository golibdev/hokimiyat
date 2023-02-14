import React, { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import { isAuthenticated } from '../handlers/auth'

const DashboardLayout = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const location = useLocation().pathname

  useEffect(() => {
    const redirectAdminPanel = () => {
       const token = localStorage.getItem('token');
       const isAuth = isAuthenticated(token)
       if (!isAuth) return navigate('/')
       setLoading(true)
    }
    redirectAdminPanel()
 }, [])
  return (
    <>
      <Header/>
      <div className="container">
        <Outlet/>
      </div>
    </>
  )
}

export default DashboardLayout
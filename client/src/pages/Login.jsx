import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import userApi from '../api/modules/user.api'
import { isAuthenticated } from '../handlers/auth'
import { toast } from 'react-toastify'

const Login = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    const redirectAdminPanel = () => {
       const token = localStorage.getItem('token');
       const isAuth = isAuthenticated(token)
       if (isAuth) return navigate('/dashboard')
    }
    redirectAdminPanel()
  }, [])

  const loginHandler = async (e) => {
    e.preventDefault()
    
    const check = {
       username: username.trim().length === 0,
       password: password.trim().length === 0
    }

    if(check.username || check.password) {
       toast.warning("Barcha maydonlar to'ldirilishi shart")
       return
    }

    const params = {
       username,
       password
    }
      const { response, err } = await userApi.sigin(params);
      console.log(response);

      if (response) {
        toast.success("Biroz kuting");
        localStorage.setItem('token', response.token);
        localStorage.setItem('fullName', response.admin.displayName)
        navigate('/dashboard')
        return
      }

      if (err) {
        console.log(err);
        toast.error(err.message)
      }
  }
  return (
    <div style={{ height: '100vh' }} className='d-flex align-items-center justify-content-center'>
      <div className='container'>
        <div className="row">
          <div className="col-lg-6 offset-lg-3 col-md-8 offset-lg-2 col-12">
            <form className="card shadow" onSubmit={loginHandler}>
              <div className="card-header bg-white d-flex align-items-center justify-content-center">
                <img src="/assets/gerb.png" className='img-fluid' width={50} alt="" />
                <h3 className='ms-3 mb-0 card-title text-center'>Qashqadaryo hokimligi</h3>
              </div>
              <div className="card-body">
                <div className='mb-3'>
                  <label htmlFor="username" className='form-label'>
                    Foydalanuvchi nomi
                  </label>
                  <input type="text" className='form-control' placeholder='Foydalanuvchi nomi' value={username} onChange={e => setUsername(e.target.value)} />
                </div>
                <div className='mb-3'>
                  <label htmlFor="password" className='form-label'>
                    Parol
                  </label>
                  <input type="password" placeholder='Parol' className='form-control' value={password} onChange={e => setPassword(e.target.value)} />
                </div>
              </div>
              <div className='card-footer bg-white py-3'>
                <button className='btn btn-primary btn-block w-100'>Kirish</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
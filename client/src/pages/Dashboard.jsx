import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import districtApi from '../api/modules/district.api';
import dayjs from 'dayjs'

const Dashboard = () => {
  const [districts, setDistricts] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAll = async () => {
    setLoading(true);
    const { response, err } = await districtApi.getAll();
    setLoading(false);

    if (response) {
      setDistricts(response.districts);
    }

    if (err) {
      toast.error(err.message);
    }
  }

  useEffect(() => {
    getAll();
  }, [])

  return (
    <div className='row mt-5'>
      <div className='d-flex align-items-center justify-content-between'>
        <h2 className='mb-3'>Tumanlar</h2>
        <button data-bs-toggle="modal" data-bs-target="#district" className='btn btn-primary btn-sm'>Tuman qo'shish</button>
        <AddDistrict getAll={getAll} />
      </div>
      <div className="table-responsive">
        <table className='table text-center table-bordered table-hover table-striped'>
          <thead>
            <tr>
              <th>#</th>
              <th>Nomi</th>
              <th>Loyihalar soni</th>
              <th>Yaratilgan vaqti</th>
            </tr>
          </thead>
          <tbody>
            {districts.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.projects.length}</td>
                <td>{dayjs(item.createdAt).format('DD.MM.YYYY HH:mm')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

const AddDistrict = ({ getAll }) => {
  const [name, setName] = useState('');
  const [file, setFile] = useState('')

  const add = async (e) => {
    e.preventDefault()
    const params = new FormData();
    params.append('name', name)
    params.append('file', file)
    const { response, err } = await districtApi.create(params);

    if (response) {
      toast.success(response.message)
      getAll();
      setName('')
      return
    }

    if (err) {
      toast.error(err.message);
    }
  }

  return (
    <div className="modal fade" id="district" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              Tuman qo'shish
            </h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form encType='multipart/form-data' onSubmit={add}>
              <div className='mb-3'>
                <label htmlFor="name" className='form-label'>Tuman nomi</label>
                <input 
                  type="text" 
                  className='form-control' 
                  placeholder='Kitob tumani' 
                  value={name} 
                  onChange={e => setName(e.target.value)} 
                />
              </div>
              <div className='mb-3'>
                <label htmlFor="file" className='form-label'>Tuman passporti</label>
                <input 
                  type="file" 
                  className='form-control'
                  onChange={e => setFile(e.target.files[0])} 
                />
              </div>

              <button className='btn btn-primary'>Qo'shish</button>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Yopish</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
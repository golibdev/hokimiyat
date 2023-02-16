import {useState, useEffect} from 'react'
import { Viewer, Worker } from '@react-pdf-viewer/core'
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import projectApi from '../api/modules/project.api';
import Loader from '../components/Loader';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { serverUrl } from '../constants/serverUrl';
import { back } from '../utils/back';

const ProjectPage = () => {
   const {projectId} = useParams()
   const [project, setProject] = useState();
   const [loading, setLoading] = useState(false)
   const navigate = useNavigate()

   const getProject = async () => {
      setLoading(true)
      const { response, err } = await projectApi.getOne(projectId);
      setLoading(false)

      if (response) {
         setProject(response.project)
      }

      if (err) {
         toast.error(err.message);
      }
   }

   useEffect(() => {
      getProject();
   }, [projectId])

   return (
      <div className='container'>
         <div className="row">
            <div className="col-12" style={{
                  border: '1px solid rgba(0, 0, 0, 0.3)',
                  height: '750px',
               }}>
               <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.3.122/build/pdf.worker.min.js">
                  {loading ? <Loader/> : (
                     <Viewer 
                        fileUrl={project && project.file && `${serverUrl}${project.file}`}
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
}

export default ProjectPage
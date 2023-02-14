import {useState, useEffect} from 'react'
import { Viewer, Worker, SpecialZoomLevel } from '@react-pdf-viewer/core'
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import projectApi from '../api/modules/project.api';
import Loader from '../components/Loader';
import '@react-pdf-viewer/core/lib/styles/index.css';

const ProjectPage = () => {
   const {projectId} = useParams()
   const [project, setProject] = useState();
   const [loading, setLoading] = useState(false)

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
                        fileUrl={project && `http://localhost:4000${project.file}`}
                        defaultScale={SpecialZoomLevel.PageWidth}
                     />
                  )}
               </Worker>
            </div>
         </div>
      </div>
   )
}

export default ProjectPage
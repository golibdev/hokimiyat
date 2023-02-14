import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { ToastContainer } from 'react-toastify'
import Footer from './components/Footer';
import DashboardLayout from './layouts/DashboardLayout';
import Branch from './pages/Branch';
import BranchAndInternalBranch from './pages/BranchAndInternalBranch';
import BranchesPage from './pages/BranchesPage';
import Category from './pages/Category';
import Dashboard from './pages/Dashboard';
import District from './pages/District';
import Districts from './pages/Districts';
import Home from './pages/Home';
import InternalBranch from './pages/InternalBranch';
import InternalBrancheDistrict from './pages/InternalBranchDistrict';
import InternalBranches from './pages/InternalBranches';
import Login from './pages/Login';
import Project from './pages/Project';
import ProjectBranchAnd from './pages/ProjectBranchAnd';
import ProjectPage from './pages/ProjectPage';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/category' element={<Category/>}/>
          <Route path='/districts' element={<Districts/>}/>
          <Route path='/districts/:districtId' element={<District/>}/>
          <Route path='/districts/:districtId/branches/:branchId' element={<InternalBrancheDistrict/>}/>
          <Route path='/district/:districtId/branches/:branchId' element={<InternalBrancheDistrict/>}/>
          <Route path='/district/:districtId/branches/:branchId/internal-branches/:internalBranchId' element={<ProjectBranchAnd/>}/>
          <Route path='/branches' element={<BranchesPage/>}/>
          <Route path='/branches/:branchId' element={<InternalBranches/>}/>
          <Route path='/branches/:branchId/internal-branches/:internalBranchId' element={<BranchAndInternalBranch/>}/>
          <Route path='/project/:projectId' element={<ProjectPage/>} />
          <Route path='/login' element={<Login/>}/>
          <Route path='/dashboard' element={<DashboardLayout/>}>
            <Route index element={<Dashboard/>} />
            <Route path='/dashboard/branch' element={<Branch/>} />
            <Route path='/dashboard/internal-branch' element={<InternalBranch/>} />
            <Route path='/dashboard/project' element={<Project/>} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer position='bottom-left' />
      <Footer/>
    </>
  )
}

export default App

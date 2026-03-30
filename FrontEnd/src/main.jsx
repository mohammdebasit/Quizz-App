import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router";
import AdashBoard from './Admin/pages/AdashBoard';
import CreateTest from './Admin/pages/CreateTest';
import AViewResult from './Admin/pages/AViewResult';
import UdashBoard from './User/pages/UdashBoard';
import UViewResult from './User/pages/UViewResult';
import AdminLayout from './layouts/AdminLayout';
import UserLayout from './layouts/UserLayout';
import AddMcqs from './Admin/components/AddMcqs';
import Test from './Admin/pages/Test';
import McqTest from './User/pages/McqTest';
import Login from '../Auth/Login';
import Registration from '../Auth/Registration';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>

      //Authentication
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />


        //Admin Routes
        <Route element={<AdminLayout />}>
          <Route path="/" element={<AdashBoard />} />
          <Route path="/createtest" element={<CreateTest />} />
          <Route path="/Result" element={<AViewResult />} />
        </Route>

      //only pages
        <Route path="/addmcq/:testId" element={<AddMcqs />} />
        <Route path="/test/:testId" element={<Test />} />
        <Route path="/testpage/:testId" element={<McqTest />} />

        //user Routes
        <Route path='/user' element={<UserLayout />}>
          <Route index element={<UdashBoard />} />
          <Route path="result" element={<UViewResult />} />
        </Route>

      </Routes>
    </BrowserRouter>

  </StrictMode>
)

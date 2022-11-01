import {React, useState, useEffect} from 'react';
import Dashboard from './Pages/Dashboard.js'
import PurokProfile from './Pages/PurokProfile.js'
import HouseholdProfile from './Pages/HouseholdProfile.js'
import ResidentProfile from './Pages/ResidentProfile.js'
import Report from './Pages/Report.js'
import BarangayTab from './Pages/BarangayTab.js'
import SignUp from './Pages/SignUp.js'
import AddEncoder from './Pages/AddEncoder.js'
import ApproveAdmin from './Pages/ApproveAdmin.js'
import LoginSuperUser from './Pages/LoginSuperUser.js'
import LoginUser from './Pages/LoginUser.js'
import AddSuperUser from './Pages/AddSuperUser.js'
import ForgotPassword from './Pages/ForgotPassword.js'
import { AuthContextProvider } from './AuthContext.js';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import ProtectedRoute from './ProtectedRoute.js';


function App() {

  return (

      <Router>
        <AuthContextProvider>
          <Routes>
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}/>
            <Route path="/barangay-tab" element={<ProtectedRoute><BarangayTab /></ProtectedRoute>}/>
            <Route path="/purok-profile" element={<ProtectedRoute><PurokProfile /></ProtectedRoute>}/>
            <Route path="/household-profile" element={<ProtectedRoute><HouseholdProfile /></ProtectedRoute>}/>
            <Route path="/resident-profile" element={<ProtectedRoute><ResidentProfile /></ProtectedRoute>}/>
            <Route path="/report" element={<ProtectedRoute><Report /></ProtectedRoute>}/>
            <Route path="/add-encoder" element={<ProtectedRoute><AddEncoder /></ProtectedRoute>}/>
            <Route path="/approve-admin" element={<ProtectedRoute><ApproveAdmin/></ProtectedRoute>}/>
            <Route path="/add-superuser" element={<ProtectedRoute><AddSuperUser /></ProtectedRoute>}/>

            <Route path="/" element={<LoginUser />}/>
            <Route path="/sign-up" element={<SignUp />}/>
            <Route path="/login-superuser" element={<LoginSuperUser/>}/>
            <Route path="/forgot-password" element={<ForgotPassword/>}/>
          </Routes>
        </AuthContextProvider>  
      </Router>
  )
}

export default App;

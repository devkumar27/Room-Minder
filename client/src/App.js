import Navbar from './components/Navbar.jsx';
import { Route, Routes } from 'react-router-dom';
import Home from './screens/Home.jsx';
import Login from './screens/Login.jsx';
import Profile from './screens/Profile.jsx';
import Register from './screens/Register.jsx'
import Complaints from './screens/Complaints.jsx';
import AllComplaints from './screens/AllComplaints.jsx';
import ComplaintHistory from './screens/ComplaintHistory.jsx';
import './App.css';
import { useState } from 'react';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={ <Home /> } />
        <Route path='/api/user' element={ <Register /> } />
        <Route path='/api/user/login' element={ <Login /> } />
        <Route path='/api/user/profile' element={ <Profile /> } />
        <Route path='/api/complaints/' element={ <Complaints /> } />
        <Route path='/api/complaints/all' element={ <AllComplaints /> } />
        <Route path='/api/complaints/history' element={ <ComplaintHistory /> } />
      </Routes>
    </>
  );
}

export default App;

import Navbar from './components/Navbar.jsx';
import { Route, Routes } from 'react-router-dom';
import Home from './screens/Home.js';
import Login from './screens/Login.js';
import Profile from './screens/Profile.js';
import Register from './screens/Register.js'
import Complaints from './screens/Complaints.js';
import AllComplaints from './screens/AllComplaints.js';
import ComplaintHistory from './screens/ComplaintHistory.js';
import './App.css';

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

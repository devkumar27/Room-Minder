import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import './styles/home.css';
import { useCookies } from 'react-cookie';

const Home = () => {
  const [cookies] = useCookies(['token']);
  const navigate = useNavigate();

  useEffect(() => {
    if(cookies.token) {
      navigate('/api/complaints')
    }
  }, [])

  return (
    <div className='box'>

        <div className='box-element'>
            <h1 className='page-heading heading-1'>Welcome to RoomMinder</h1>
            <p>Your one stop for Hostel Room Maintenance</p>
            <button className='btn'><a><Link to="api/user/login">Login</Link></a></button>          
            <button className='btn'><Link to="api/user/">Register</Link></button> 
        </div>

    </div>
  )
};

export default Home;
import React from 'react';
import './styles/authScreens.css';

const Register = () => {
  return (
    <div className="reg-card card">

        <div className="heading">
            <h2>Welcome to RoomMinder!</h2>
            <p>Create an account</p>
        </div>

        <div className="input-group">
            <input type="text" id="firstName" className="input-field" placeholder="First Name" />
        </div>

        <div className="input-group">
            <input type="text" id="lastName" className="input-field" placeholder="Last Name" />
        </div>

        <div className="input-group">
            <input type="text" id="userID" className="input-field" placeholder="Registration Number" />
        </div>

        <div className="input-group">
            <input type="text" id="email" className="input-field" placeholder="Email" />
        </div>

        <div className="input-group">
            <input type="password" id="password" className="input-field" placeholder="Password" />
        </div>

        <div className="input-group">
            <input type="password" id="re-password" className="input-field" placeholder="Re-enter password" />
        </div>

        <div className="input-group">
            <input type="text" id="roomNo" className="input-field" placeholder="Room Number" />
        </div>

        <div className="input-group row">

            <div className="row">
                <span>Already have an account? <a href="/api/user/login" className="alternate-opt">Login</a></span> 
            </div>

        </div>

        <div className="input-group">
            <button className="btn">Register</button>
        </div>

    </div>
  )
};

export default Register;
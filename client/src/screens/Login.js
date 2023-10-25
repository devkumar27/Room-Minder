import React from 'react';
import './styles/authScreens.css';

const Login = () => {
    return(
        <div className="card">

            <div className="heading">
                <h2>Login to RoomMinder!</h2>
                <p>Sign In to your account</p>
            </div>

            <div className="input-group">
                <input type="text" id="email" className="input-field" placeholder="Email" />
            </div>

            <div className="input-group">
                <input type="password" id="password" className="input-field" placeholder="Password" />
            </div>

            <div className="input-group row">

                <div className="row">
                    <span>Do not have an account? <a href="/api/user" className="alternate-opt">Create Account.</a></span> 
                </div>
            </div>

            <div className="input-group">
                <button className="btn">Login</button>
            </div>

        </div>
    );
}

export default Login

import React from 'react';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import './styles/authScreens.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const [inputValue, setInputValue] = useState({
        email: "",
        password: "",
    });
    const { email, password } = inputValue;

    const handleOnChange = (event) => {
        const { name, value } = event.target;
        setInputValue({
        ...inputValue,
        [name]: value,
        });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { data } = await axios.post("http://localhost:5000/api/user/login",
            {
                ...inputValue
            },
            { withCredentials: true }
        );
        const { message, success, token } = data;
        if(success) {
            alert(message);
            setCookie('token', token);
            navigate('/');
        } 
        else {
            console.log(message);
        }
    }

    return(
        <div className="card">
            <form onSubmit={handleSubmit}>
                <div className="heading">
                    <h2>Login to RoomMinder!</h2>
                    <p>Sign In to your account</p>
                </div>

                <div className="input-group">
                    <input 
                    type="text" 
                    name="email"
                    value={email}
                    id="email" 
                    className="input-field" 
                    placeholder="Email"
                    onChange={handleOnChange} />
                </div>

                <div className="input-group">
                    <input type="password" 
                    name="password"
                    value={password}
                    id="password" 
                    className="input-field" 
                    placeholder="Password"
                    onChange={handleOnChange} />
                </div>

                <div className="input-group row">

                    <div className="row">
                        <span>Do not have an account? <a href="/api/user" className="alternate-opt">Create Account.</a></span> 
                    </div>
                </div>

                <div className="input-group">
                    <button className="btn">Login</button>
                </div>
            </form>
        </div>
    );
}

export default Login

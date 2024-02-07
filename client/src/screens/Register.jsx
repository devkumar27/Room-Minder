import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles/authScreens.css';

const Register = () => {
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        userID: "",
        roomNo:""
    });
    const { email, password, firstName, lastName, userID, roomNo } = inputValue;

    const handleSubmit = async(event) => {
        event.preventDefault();
        try {
            const { data } = await axios.post(
                "http://localhost:5000/api/user/", 
                {
                    ...inputValue
                },             
                { withCredentials: true }
            )
            const { success, message } = data;

            if(success) {
                alert(message);
                navigate('/api/user/login');
            }
            else {
                alert(message);
            }
        } catch(err) {
            console.log(err);
        }
        setInputValue({
            ...inputValue,
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            userID: "",
            roomNo:""
        });
    }

    const handleOnChange = (event) => {
        const { name, value } = event.target;
        setInputValue({
        ...inputValue,
        [name]: value,
        });
    }

    return (
        <div className="reg-card card">
            <form onSubmit={handleSubmit}>
                <div className="heading">
                    <h2>Welcome to RoomMinder!</h2>
                    <p>Create an account</p>
                </div>

                <div className="input-group">
                    <input 
                    type="text" 
                    name= "firstName"
                    value= {firstName}
                    id= "firstName" 
                    className="input-field" 
                    placeholder="First Name"
                    onChange={handleOnChange} />
                </div>

                <div className="input-group">
                    <input 
                    type="text"
                    value= {lastName}
                    name= "lastName"
                    id= "lastName"
                    className="input-field" 
                    placeholder="Last Name"
                    onChange={handleOnChange} />
                </div>

                <div className="input-group">
                    <input 
                    type="text"
                    name="userID"
                    value={userID}
                    id="userID"
                    className="input-field" 
                    placeholder="Registration Number"
                    onChange={handleOnChange} />
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
                    <input 
                    type="password"
                    name="password"
                    value={password}
                    id="password" 
                    className="input-field" 
                    placeholder="Password"
                    onChange={handleOnChange} />
                </div>

                <div className="input-group">
                    <input 
                    type="text" 
                    name="roomNo"
                    value={roomNo}
                    id="roomNo" 
                    className="input-field" 
                    placeholder="Room Number"
                    onChange={handleOnChange} />
                </div>

                <div className="input-group row">

                    <div className="row">
                        <span>Already have an account? <a href="/api/user/login" className="alternate-opt">Login</a></span> 
                    </div>

                </div>

                <button type="submit" className="btn">Register</button>
            </form>
        </div>
    )
};

export default Register;
import React, { useState } from 'react';

import './styles/authScreens.css';
import { useCookies } from 'react-cookie';
import axios from 'axios';

const Complaints = () => {
    const [cookies] = useCookies(['token']);
    const [inputValue, setInputValue] = useState({
        complaintType: "",
        description: ""
    });
    const { complaintType, description } = inputValue;

    const handleOnChange = (event)=> {
        const { name, value } = event.target;
        setInputValue({
            ...inputValue,
            [name]: value,
        });
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const token = cookies.token;
            const { data } = await axios.post("http://localhost:5000/api/complaints",
                {
                    ...inputValue
                },
                {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                },
                { withCredentials: true}
            );

            const { success, message } = data;
            if(success) {
                alert(message);
            } else {
                alert(message);
            }
            setInputValue({
                complaintType: "",
                description: ""
            });
        } catch(err) {
            alert(err)
        }

    }

    

    return(
        <div className="card">
            <form onSubmit={handleSubmit}>
                <div className="heading">
                    <h2>New Complaint</h2>
                    <p>Raise a new complaint</p>
                </div>

                <div className="input-group">
                    <label for="complaintType">Complaint Type</label>
                    <select
                    name="complaintType"
                    value={complaintType}
                    id="complaintType" 
                    className="input-field"
                    onChange={handleOnChange} >
                        <option value="">Select an option...</option>
                        <option value="Electrical">Electrical</option>
                        <option value="Cleaning">Cleaning</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div className="input-group">
                    <label for="description">Description</label>
                    <textarea
                    name="description"
                    value={description}
                    id="description" 
                    className="input-field" 
                    placeholder="Describe your issue..."
                    onChange={handleOnChange} 
                    rows="400" />
                </div>

                <div className="input-group">
                    <button className="btn">Submit</button>
                </div>
            </form>
        </div>
    );
}

export default Complaints;
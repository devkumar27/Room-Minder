import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

import notFoundImg from '../images/not-found.png';
import './styles/history.css';

const ComplaintHistory = () => {
    const [history, setHistory] = useState([]);
    const [zeroComplaints, setZeroComplaints] = useState(false);
    const [cookies] = useCookies(['token']);

    useEffect(() => {
        fetchComplaints();
    });

    const fetchComplaints = async () => {
        const token = cookies.token;
        const res = await axios.get('http://localhost:5000/api/complaints/history', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if(res.status === 200) {
            setHistory(res.data.complaints);
        } else if(res.status === 204) {
            setZeroComplaints(true);
        } else {
            alert(res.data.message);
        }
    }
 
    return(
        <div>
            <h1 className='page-heading'>Your Complaint History</h1>
            {zeroComplaints &&
                <div className='not-found-div'>
                    <img src={notFoundImg} id='not-found-img' />
                    <h3>All good. No complaints found.</h3> 
                </div>
            }
            {!zeroComplaints && 
                <div className="container">
                    <table className='table table-fixed'>
                        <thead>
                            <tr>
                                <th scope="col" class="col-xs-6">Description</th>
                                <th scope="col" class="col-xs-3">Type</th>
                                <th scope="col" class="col-xs-3">Status</th>
                            </tr>
                        </thead>

                        <tbody>
                            {!zeroComplaints && history.map((val, index) => {
                                return(
                                    <tr className='table-item'>
                                        <td className='col-xs-6'>{val.description}</td>
                                        <td className='c-type'>{val.complaintType}</td>
                                        <td><span className={val.isResolved? 'status green' : 'status yellow'}>{val.isResolved? "Resolved" : "Under Review"}</span></td>
                                    </tr>
                                )
                            })
                            }
                        </tbody>
                    
                    </table>
                </div>
            }
        </div>
    );
}

export default ComplaintHistory;
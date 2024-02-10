import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../components/styles/navbar.css';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const navigate = useNavigate();

    useEffect(() => {
        if(cookies.token) {
            setIsLoggedIn(true);
        }
    }, [cookies, setCookie, removeCookie])

    const handleLogout = async () => {
        const res = await axios.get("http://localhost:5000/api/user/logout", { withCredentials: true });
        setIsLoggedIn(false);
        removeCookie('token');
        alert(res.data.message);
        navigate("/api/user/login");
    }

    return(
        <div className="navbar">
            <h1>RoomMinder</h1>
            {isLoggedIn && (
                <div className='nav-links'>
                    <a><Link to="api/complaints/">File A Complaint</Link></a>            
                    {/* <a><Link to="api/complaints/all">All Complaints</Link></a> */}
                    <a><Link to="api/complaints/history">History</Link></a>
                </div>
            )}
            
            <div className='nav-links'>
                {!isLoggedIn ? (
                    <>
                        <a><Link to="api/user/login">Login</Link></a>          
                        <a><Link to="api/user/">Register</Link></a> 
                    </>
                ) : (
                    <>
                        <a onClick={handleLogout}><Link to="api/user/login">Logout</Link></a>
                    </>
                )}
                 
            </div>
        </div>
    )
}

export default Navbar;
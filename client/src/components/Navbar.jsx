import { Link } from 'react-router-dom';
import '../components/styles/navbar.css';
import { useSelector } from 'react-redux';

const Navbar = () => {
    const isLogin = useSelector(state => state.isLogin);
    
    return(
        <div className="navbar">
            <h1>RoomMinder</h1>
            {isLogin && (
                <div className='nav-links'>
                    <a><Link to="api/complaints/">File A Complaint</Link></a>            
                    <a><Link to="api/complaints/all">All Complaints</Link></a>
                    <a><Link to="api/complaints/history">History</Link></a>
                </div>
            )}
            
            <div className='nav-links'>
                {!isLogin && (
                    <>
                        <a><Link to="api/user/login">Login</Link></a>          
                        <a><Link to="api/user/">Register</Link></a> 
                    </>
                )}
                {isLogin && (
                    <>
                        <a><Link to="api/user/">Logout</Link></a>
                    </>
                )}
                 
            </div>
        </div>
    )
}

export default Navbar;
import React from 'react';
import { Link } from 'react-router-dom'

const NavBar = (props) => {
    const token = localStorage.getItem('token')

    const logout = () => {
        localStorage.removeItem('token')
        props.history.push('/')
    }

    if(!token) {
        return ( 
        <div className="nav-bar">
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/employees">Employees</Link>
        </div>
     )
    } else {
        return ( 
        <div className="nav-bar">
            <Link to="/">Home</Link>
            <Link to="/employees">Employees</Link>
            <button onClick={logout}>Logout</button>
        </div>
     )
    }
    
}
 
export default NavBar;
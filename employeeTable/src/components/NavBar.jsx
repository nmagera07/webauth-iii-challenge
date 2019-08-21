import React from 'react';
import { Link } from 'react-router-dom'

const NavBar = (props) => {
    return ( 
        <div>
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/employees">Employees</Link>
        </div>
     );
}
 
export default NavBar;
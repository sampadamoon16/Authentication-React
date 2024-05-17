import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import './navbar.css'

function Navbar() {

    const [isOpen, setIsOpen] = useState(false);

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    const navigate = useNavigate()

    const handleLogout = (event) => {
        event.preventDefault();
        const token = localStorage.getItem('token');
         axios.get('http://localhost:8081/logout' , token
       
    )
            .then(res => {                
                alert("You Are Logout From Here");

                // Clear the token from localStorage
                localStorage.removeItem('token');
                
                // window.location.reload(true);
                navigate('/');
            })
            .catch(err => {
                console.error(err);
                alert("An error occurred while logging out. Please try again.");
            });
    };

    return (
        <div className="App">
            <nav className="navbar1">
                <div className="navbar-brand">
                    <a href="#">MyLogo</a>
                    <button className="navbar-toggler" onClick={toggleNavbar}>
                        ☰
                    </button>
                </div>
                <div className={`navbar-menu ${isOpen ? 'is-active' : ''}`}>
                    <a href="#" className="navbar-item">Home</a>
                    <a href="#" className="navbar-item">About</a>
                    <a href="#" className="navbar-item">Services</a>
                    <a href="#" className="navbar-item">Contact</a>

                    <button className="logout-button" onClick={handleLogout}> Log Out</button>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
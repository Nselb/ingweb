import React, { useEffect, useState } from 'react';
import Navbar, { Footer } from "../components/NavFooter";
import logo from '../images/logo192.png';



function Login() {

    useEffect(() => {
        localStorage.setItem('user', {})
    }, [])
    

    return (
        <>
            <Navbar />
            <div className="form_container">
                <img src={logo} alt="logo Poro Opresor" style={{ width: '100px' }} />
                <h2>
                    Iniciar Sesion en Poro Opresor
                </h2>
                <form method='get'>
                    <div className='container_mail'>
                        <input type="email" placeholder='E-mail' />
                        <input type="password" name="password" id="passwordid" placeholder='Contraseña' />
                        <button type="submit">Iniciar Sesión</button>
                    </div>
                </form>
            </div>
            <Footer />
        </>
    );
}

export default Login;
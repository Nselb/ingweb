import Navbar, { Footer } from '../components/NavFooter';
import '../css/register.css'
import logo from '../images/logo192.png';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Register() {

    const baseUrl = 'https://localhost:7163'

    const [user, setUser] = useState({
        userId: 0,
        summonerId: '',
        regionId: 'LA1',
        summonerName: '',
        email: '',
        userPassword: '',
        isAdmin: false
    })

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const handleSubmit = async event => {
        event.preventDefault();
        delete user.userId
        await axios.post(`${baseUrl}/api/Users`, user)
            .then(r => {
                console.log(r.data);
                if (r) {
                    
                }
            })
            .catch(e => {
                console.log(e);
            })
    }

    return (
        <>
            <Navbar />
            <div className="form_container">
                <img src={logo} alt="logo Poro Opresor" style={{ width: '100px' }} />
                <h2>
                    Registrarse en Poro Opresor
                </h2>
                <form method='post' onSubmit={handleSubmit}>
                    <div className='container_mail'>
                        <input type="email" name='email' placeholder='E-mail' onChange={handleChange} />
                        <input type="password" name="userPassword" placeholder='Contraseña' onChange={handleChange} />
                        <div className="form_summoner_container">
                            <input type="text" placeholder='Nombre de invocador' name='summonerName' onChange={handleChange} />
                            <select className='register_select' name='regionId' onChange={handleChange}>
                                <option value="LA1">LAN</option>
                                <option value="LA2">LAS</option>
                                <option value="BR1">BR</option>
                                <option value="EUN1">EUNE</option>
                                <option value="EUW1">EUW</option>
                                <option value="JP1">JP</option>
                                <option value="KR">KR</option>
                                <option value="NA1">NA</option>
                                <option value="OC1">OCE</option>
                                <option value="TR1">TR</option>
                                <option value="RU">RU</option>
                            </select>
                        </div>
                        <button type="submit">Registrarse</button>
                    </div>
                </form>
            </div>
            <Footer />
        </>
    );
}

export default Register;
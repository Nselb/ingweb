import React from 'react';
import Navbar, { Footer } from '../components/NavFooter';
import '../css/register.css'
import logo from '../images/logo192.png';

function Register() {
    return (
        <>
            <Navbar />
            <div className="form_container">
                <img src={logo} alt="logo Poro Opresor" style={{ width: '100px' }} />
                <h2>
                    Registrarse en Poro Opresor
                </h2>
                <form>
                    <div className='container_mail'>
                        <input type="email" placeholder='E-mail' />
                        <input type="password" name="password" id="passwordid" placeholder='Contraseña' />
                        <div className="form_summoner_container">
                            <input type="text" placeholder='Nombre de invocador' />
                            <select className='register_select'>
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
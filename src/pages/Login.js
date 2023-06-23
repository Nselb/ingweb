import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import Navbar, { Footer } from "../components/NavFooter";
import '../css/Form.css'
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';



function Login() {

    const baseUrl = 'https://apiporo.azurewebsites.net'
    const logo = '/images/logo192.png'
    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: '',
        userPassword: ''
    });

    useEffect(() => {
        if (localStorage.getItem('user')) {
            navigate('/')
        }
    }, [navigate])

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const handleError = () => {
        console.log("Fallo");
    }

    const handleGoogleLogin = async r => {
        console.log(r);
        await axios.get(`${baseUrl}/api/Users/Login?token=${r.credential}`)
            .then(r => {
                console.log(r);
                if (r.data.email === "Usuario No Registrado") {
                    navigate("/register");
                }
                else {
                    axios.get(`${baseUrl}/api/Summoners/${r.summonerId}`)
                        .then(res => {
                            console.log(res);
                            localStorage.setItem('user', JSON.stringify({
                                email: r.data.email,
                                regionId: r.data.regionId,
                                summonerName: r.data.summonerName,
                                summonerId: r.data.summonerId,
                                puuid: res.data.puuid,
                                summonerLevel: res.data.summonerLevel,
                                iconId: res.data.profileIconID
                            }))
                            navigate('/')
                        })
                }
            })
    }

    const handleSubmit = async e => {
        e.preventDefault();
        await axios.get(`${baseUrl}/api/Users/${user.email}/${user.userPassword}`)
            .then(r => {
                if (r.data) {
                    axios.get(`${baseUrl}/api/Summoners/${r.data.summonerId}`)
                        .then(res => {
                            localStorage.setItem('user', JSON.stringify({
                                email: r.data.email,
                                regionId: r.data.regionId,
                                summonerName: r.data.summonerName,
                                summonerId: r.data.summonerId,
                                puuid: res.data.puuid,
                                summonerLevel: res.data.summonerLevel,
                                iconId: res.data.profileIconID
                            }))
                            navigate('/')
                        })
                }
            })
            .catch(e => {
                console.log(e);
            })
    }

    return (
        <>
            <Navbar />
            <div className='form__body'>
                <div className='form__container'>
                    <div className='form__header'>
                        <img src={logo} alt="logo Poro Opresor" style={{ width: '100px' }} />
                        <h2>
                            Iniciar Sesion en Poro Opresor
                        </h2>
                    </div>
                    <form method='get' onSubmit={handleSubmit}>
                        <div className='form'>
                            <input className='form__input' type="email" name='email' placeholder='E-mail' onChange={handleChange} />
                            <input className='form__input' type="password" name="userPassword" placeholder='Contraseña' onChange={handleChange} />
                            <button className='form__btn' type="submit">Iniciar Sesión</button>
                        </div>
                    </form>
                    <GoogleLogin onSuccess={handleGoogleLogin} onError={handleError} />
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Login;
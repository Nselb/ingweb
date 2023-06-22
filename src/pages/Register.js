import Navbar, { Footer } from '../components/NavFooter';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import '../css/Form.css'

function Register() {

    const baseUrl = 'https://apiporo.azurewebsites.net'
    const navigate = useNavigate();
    const logo = '/images/logo192.png'

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
    useEffect(() => {
        if (localStorage.getItem('user')) {
            console.log('a');
            navigate('/')
        }
    }, [navigate])

    const handleSubmit = async event => {
        event.preventDefault();
        delete user.userId
        await axios.post(`${baseUrl}/api/Users`, user)
            .then(r => {
                console.log(r.data);
                if (r.data.summonerId) {
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
                } else {
                    //TODO: display error msg
                }
            })
            .catch(e => {
                console.log(e);
            })
    }

    return (
        <>
            <Navbar />
            <div className="form__body">
                <div className='form__container'>
                    <div className='form__header'>
                        <img src={logo} alt="logo Poro Opresor" style={{ width: '100px' }} />
                        <h2>
                            Registrarse en Poro Opresor
                        </h2>
                    </div>
                    <form method='post' onSubmit={handleSubmit}>
                        <div className='form'>
                            <input className='form__input' type="email" name='email' placeholder='E-mail' onChange={handleChange} />
                            <input className='form__input' type="password" name="userPassword" placeholder='Contraseña' onChange={handleChange} />
                            <div className='form__input-select__container'>
                                <input className='form__input form__input--select' type="text" placeholder='Nombre de invocador' name='summonerName' onChange={handleChange} />
                                <select className='form__select' name='regionId' onChange={handleChange}>
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
                            <button className='form__btn' type="submit">Registrarse</button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Register;
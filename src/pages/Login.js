import React, { useState, useEffect } from 'react';
import md from 'md5';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from 'universal-cookie';
import axios from 'axios';
import '../css/Login.css';

function Login() {

    const baseUrl = 'https://localhost:7298/api/users';
    const cookies = new Cookies();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        username: '',
        password: ''
    })
    const handleChange = e => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        });
        console.log(value);
    }

    const iniciarSesion = async () => {
        await axios.get(baseUrl + `/${form.username}/${md(form.password)}`)
            .then(r => {
                return r.data;
            })
            .then(r => {
                if (r.length > 0) {
                    var res = r[0];
                    console.log(res);
                    cookies.set('id', res.userId, { path: '/' });
                    cookies.set('username', res.userName, { path: '/' });
                    cookies.set('logged', true, { path: '/' });
                    navigate('/users')
                }
            })
            .catch(e => {
                console.log(e);
            })
    }

    useEffect(() => {
        if (cookies.get('logged')) {
            navigate('/users')
        }
    })

    return (
        <div className='containerPrincipal'>
            <div className='containerLogin'>
                <div className='form-group'>
                    <label>Usuario: </label>
                    <br />
                    <input
                        type='text'
                        className='form-control'
                        name='username'
                        onChange={handleChange}
                    />
                    <br />
                    <label>Contraseña: </label>
                    <br />
                    <input
                        type='password'
                        className='form-control'
                        name='password'
                        onChange={handleChange}
                    />
                    <br />
                    <button className='btn btn-primary' onClick={() => iniciarSesion()}>Iniciar Sesión</button>
                </div>
            </div>
        </div>
    )
}

export default Login;
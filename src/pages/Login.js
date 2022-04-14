import React, { useState, useEffect } from 'react';
import md from 'md5';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from 'universal-cookie';
import axios from 'axios';
import '../css/Login.css';
import Navbar from '../components/Navbar/NavBar';

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
        <div>
            <Navbar />
            <div className='container-fluid-sm px-1 py-5 mx-auto w-25 align-middle'>
                <form className='form-card border border rounded p-2 bg-light'>
                    <h1 className='display-6 text-center'>Iniciar Sesión</h1>
                    <div className='row g-2 m-auto'>
                        <div className='col'>
                            <input type='text' placeholder='Nombre de usuario' className='form-control' name='username' onChange={handleChange} />
                        </div>
                    </div>
                    <div className='row g-2 m-auto'>
                        <div className='col'>
                            <input type='password' placeholder='Contraseña' className='form-control' name='password' onChange={handleChange} />
                        </div>
                    </div>
                    <div className='row g-2 m-auto'>
                        <div className='col text-center'>
                            <button className='btn btn-primary' onClick={() => iniciarSesion()}>Iniciar Sesión</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login;
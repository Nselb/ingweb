import md from 'md5';
import axios from 'axios';
import '../css/Login.css';
import Cookies from 'universal-cookie';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar/NavBar';
import React, { useState } from 'react';

function Login() {

    const baseUrl = 'https://localhost:7298/api/';
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
    }

    const iniciarSesion = async () => {
        await axios.get(`${baseUrl}users/${form.username}/${md(form.password)}`)
            .then(r => {
                cookies.set('user', r.data[0])
                console.log(cookies.get('user'));
                return r.data;
            })
            .then(r => {
                if (r.length > 0) {
                    var res = r[0];
                    axios.get(`${baseUrl}summoner/${res.summonerID}`)
                        .then(r => {
                            cookies.set('summoner', r.data)
                            console.log(cookies.get('summoner'));
                            navigate('/')
                        })
                }
            })
            .catch(e => {
                console.log(e);
            })
    }

    return (
        <div>
            <Navbar />
            <div className='container-fluid-sm px-1 py-5 mx-auto w-25 align-middle'>
                <div className='form-card border border rounded p-2 bg-light'>
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
                </div>
            </div>
        </div>
    )
}

export default Login;
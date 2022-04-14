import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar/NavBar';
import md5 from 'md5';

export default function Register() {

    const baseUrl = 'https://localhost:7298/api/users';
    const [data, setData] = useState([]);
    const cookies = new Cookies();
    const navigate = useNavigate();

    const [selectedUser, setSelectedUser] = useState({
        userId: '',
        userLoginName: '',
        userName: '',
        userLastName: '',
        userPassword: ''
    })
    const handleChange = e => {
        const { name, value } = e.target;
        setSelectedUser({
            ...selectedUser,
            [name]: value
        });
    }
    const postUsuario = async () => {
        delete selectedUser.userId;
        selectedUser.userPassword = md5(selectedUser.userPassword);
        await axios.post(baseUrl, selectedUser)
            .then(r => {
                cookies.set('id', r.data.userId, { path: '/' });
                cookies.set('username', r.data.userName, { path: '/' });
                cookies.set('logged', true, { path: '/' });
                setData(data.concat(r.data));
            }).catch(e => {
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
            <div className='container-fluid-sm px-1 py-5 mx-auto w-50 align-middle'>
                <form className='form-card border border rounded p-2 bg-light'>
                    <h1 className='display-6 text-center'>Registrarse</h1>
                    <div className='row g-2 m-auto'>
                        <div className='col'>
                            <input type='text' placeholder='Nombre de usuario' className='form-control' name='userLoginName' onChange={handleChange} />
                        </div>
                    </div>
                    <div className='row g-2 m-auto'>
                        <div className='col'>
                            <input type='text' placeholder='Nombre' className='form-control' name='userName' onChange={handleChange} />
                        </div>
                        <div className='col'>
                            <input type='text' placeholder='Apellido' className='form-control' name='userLastName' onChange={handleChange} />
                        </div>
                    </div>
                    <div className='row g-2 m-auto'>
                        <div className='col'>
                            <input type='password' placeholder='Contraseña' className='form-control' name='userPassword' onChange={handleChange} />
                        </div>
                    </div>
                    <div className='row g-2 m-auto'>
                        <div className='col text-center'>
                            <button className='btn btn-primary' onClick={() => postUsuario()}>Registrarse</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

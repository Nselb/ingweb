import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar/NavBar';



export default function Register() {
    const [selectedUser, setSelectedUser] = useState({
        userId: '',
        userLoginName: '',
        userName: '',
        userLastName: ''
    })
    const handleChange = e => {
        const { name, value } = e.target;
        setSelectedUser({
            ...selectedUser,
            [name]: value
        });
    }
    return (
        <form className='form-group'>
            <Navbar/>
            <label>Username: </label>
            <br />
            <input type='text' className='form-control' name='userLoginName' onChange={handleChange} />
            <br />
            <label>Nombre: </label>
            <br />
            <input type='text' className='form-control' name='userName' onChange={handleChange} />
            <br />
            <label>Apellido: </label>
            <br />
            <input type='text' className='form-control' name='userLastName' onChange={handleChange} />
            <br />
            <label>Contraseña: </label>
            <br />
            <input type='password' className='form-control' name='userPassword' onChange={handleChange} />
            <br />
            <button className='btn btn-primary' >Registrarse</button>
            <br />
        </form>
    )
}

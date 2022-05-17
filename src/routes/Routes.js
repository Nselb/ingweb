import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Users from '../pages/Users';
import Profile from '../pages/Profile';
import Campeones from '../pages/Campeones'

function Rutas() {

    return (
        <BrowserRouter >
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/register' element={<Register />} />
                <Route path='/login' element={<Login />} />
                <Route path='/users' element={<Users />} />
                <Route path='/perfil' element={<Profile />} />
                <Route path='/campeones' element={<Campeones />} />
            </Routes>
        </BrowserRouter >
    )
}

export default Rutas;

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Users from '../pages/Users';
import Profile from '../pages/Profile';
import Champions from '../pages/Champions';

function Rutas() {

    return (
        <BrowserRouter >
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/register' element={<Register />} />
                <Route path='/login' element={<Login />} />
                <Route path='/users' element={<Users />} />
                <Route path='/profile' element={<Profile />} />
                <Route path='/champions' element={<Champions />} />
            </Routes>
        </BrowserRouter >
    )
}

export default Rutas;

import React from 'react';
import Cookies from 'universal-cookie';
import 'bootstrap/dist/css/bootstrap.min.css'
import { useNavigate } from 'react-router-dom';

const cookies = new Cookies();

var navBarList;

function CerrarSesion() {
    cookies.remove('user');
    cookies.remove('summoner');
    window.location.reload();
}

const getAdmin = () => {
    var user = cookies.get('user');
    if (user) {
        if (user.usuarioAdmin) {
            return true;
        }
    }
    return false;
}

function LoginNavBar() {
    const navigate = useNavigate();
    return (
        <div className='container-fluid bg-dark'>
            <nav className='navbar navbar-expand-sm navbar-dark'>
                <a href='/' className='navbar-brand mb-0 h1'>
                    <img className='d-inline-block align-top me-1' src='https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg' alt='logo' width='30' height='30' />
                    Poropresor
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNab" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className='collapse navbar-collapse d-flex-sm-row justify-content-start' id='navbarNab'>
                    <ul className='navbar-nav'>
                    </ul>
                </div>
                <div className='collapse navbar-collapse d-flex-sm-row justify-content-end' id='navbarNab'>
                    <div>
                        <button className='btn btn-primary m-1' onClick={() => { navigate('/login') }}>
                            Iniciar Sesión
                        </button>
                        <button className='btn btn-success m-1' onClick={() => { navigate('/register') }}>
                            Registrarse
                        </button>
                    </div>
                </div>


            </nav>
        </div>
    )
}


function LoggedNavBar() {
    const navigate = useNavigate();
    if (getAdmin()) {
        navBarList = (
            <>
                <li className='nav-item'>
                    <a href='/' className='nav-link'>
                        Inicio
                    </a>
                </li>
                <li className='nav-item'>
                    <a href='/users' className='nav-link'>
                        Usuarios
                    </a>
                </li>
            </>
        )
    } else {
        navBarList = (
            <>
                <li className='nav-item'>
                    <a href='/' className='nav-link'>
                        Inicio
                    </a>
                </li>
            </>
        )
    }
    return (
        <div className='container-fluid bg-dark'>
            <nav className='navbar navbar-expand-sm navbar-dark'>
                <a href='/' className='navbar-brand mb-0 h1'>
                    <img className='d-inline-block align-top me-1' src='https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg' width='30' height='30' alt='logo' />
                    Poropresor
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNab" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className='collapse navbar-collapse d-flex-m-row justify-content-start' id='navbarNab'>
                    <ul className='navbar-nav'>
                        {navBarList}
                    </ul>
                </div>
                <div className='collapse navbar-collapse d-flex-sm-row justify-content-end' id='navbarNab'>
                    <button type='button' className='btn btn btn-primary m-1' onClick={() => { navigate('/perfil') }}>
                        
                        <img src={`http://ddragon.leagueoflegends.com/cdn/12.8.1/img/profileicon/${cookies.get('summoner').profileIconID}.png`} width='30' className='me-2' alt='Summoner icon' />
                        {cookies.get('summoner').summonerName}
                    </button>
                    <button type='button' className='btn btn btn-danger m-1' style={{ border: 'none', height: '45px' }} onClick={() => CerrarSesion()}>
                        Cerrar Sesión
                    </button>
                </div>
            </nav>
        </div>
    )
}

const Navbar2 = () => {
    const cookies = new Cookies();
    if (!cookies.get('user')) {
        return <LoginNavBar />;
    }
    else {
        return <LoggedNavBar />;
    }
};

export default Navbar2;           
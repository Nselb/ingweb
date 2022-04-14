import React from 'react';
import Cookies from 'universal-cookie';
import { Nav, NavLink, Bars, NavMenu, NavBtn, NavBtnLink, NavBtnLinkDanger, NavBtnLinkSuccess } from './NavbarElements';
import 'bootstrap/dist/css/bootstrap.min.css';


function LoginNavBar() {
    return (
        <header>
            <Nav>
                <NavLink to='/'>
                    <h1>Coso</h1>
                </NavLink>
                <Bars />
                <NavMenu />
                <NavBtn>
                    <NavBtnLinkSuccess to='/register'>
                        Registrarse
                    </NavBtnLinkSuccess>
                    <NavBtnLink to='/login'>
                        Iniciar Sesion
                    </NavBtnLink>
                </NavBtn>
            </Nav>
        </header>
    )
}

function CerrarSesion() {
    const cookies = new Cookies();
    cookies.remove('id', { path: '/' });
    cookies.remove('logged', { path: '/' });
    cookies.remove('username', { path: '/' });
    window.location.reload();
}

function LoggedNavBar() {
    const cookies = new Cookies();
    return (
        <header>
            <Nav>
                <NavLink to='/'>
                    <h1>Coso</h1>
                </NavLink>
                <Bars />
                <NavMenu />
                <NavBtn>
                    <NavBtnLink to='/'>
                        Bienvenido {cookies.get('username')}!
                    </NavBtnLink>
                    <NavBtnLinkDanger to='/' onClick={() => CerrarSesion()}>
                       Cerrar Sesion
                    </NavBtnLinkDanger>
                </NavBtn>
            </Nav>
        </header >
    )
}

const Navbar = () => {
    const cookies = new Cookies();
    if (!cookies.get('logged')) {
        return <LoginNavBar />;
    }
    else {
        return <LoggedNavBar />;
    }
};

export default Navbar;           
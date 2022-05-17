import React from "react";
import '../css/navbar.css';
import logo from '../images/logo192.png'

function NotLogged() {
    return (
        <>
            <li>
                <button className="btn_navbar" id="btn_login">Iniciar sesión</button>
            </li>
            <li>
                <button className="btn_navbar" id="btn_register">Registrarse</button>
            </li>
        </>
    );
}

function Logged() {
    return (
        <>
            <li>
                <button className="btn_navbar" id="btn_profile">Perfil</button>
            </li>
            <li>
                <button className="btn_navbar" id="btn_logout">Cerrar sesión</button>
            </li>
        </>
    );
}

function Navbar() {
    return (
        <header>
            <nav>
                <ul>
                    <li className="logo">
                        <a href="/">
                            <img src={logo} alt="logo" />
                        </a>
                    </li>
                    <li>
                        <a href="/">Inicio</a>
                    </li>
                    <li>
                        <a href="/campeones">Campeones</a>
                    </li>
                </ul>
                <ul>
                    <li>
                        <input type="text" name="summoner_nav" id="summonername_nav_id" placeholder="Buscar..." />
                        <select>
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
                        <button className="btn-search">
                            <img src="https://cdn-icons-png.flaticon.com/512/54/54481.png" alt="searc hicon" />
                        </button>
                    </li>
                </ul>
                <ul className="button-container">
                    {
                        false ? <Logged /> : <NotLogged />
                    }
                </ul>
            </nav>
        </header>
    );
}

function Footer() {
    return (
        <footer>
            <div className="footer_container">
                <div className="footer_box">
                    <h2>About</h2>
                    <p>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                        Recusandae voluptates, et voluptatum delectus qui facilis maiores pariatur tempora dignissimos
                        id perspiciatis? Consequatur placeat minus, dignissimos dolores harum tempora voluptatibus sed.
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem, sed voluptates, quisquam quos,
                        alias quis cumque sint laborum repellat tempore suscipit molestiae facere adipisci voluptatem.
                        Eaque eum delectus omnis minus.
                    </p>
                </div>
                <div className="footer_box copyright">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
                </div>
            </div>
        </footer>
    );
}

export default Navbar;
export {
    Footer
}

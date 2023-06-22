import React from "react";
import '../css/navbar.css'
import '../css/Footer.css'

function NotLogged() {
    return (
        <>
            <li>
                <a href="/login" className="nav__link">Iniciar sesión</a>
            </li>
            <li>
                <a href="/register" className="nav__link" >Registrarse</a>
            </li>
        </>
    );
}

function Logged() {
    const user = JSON.parse(localStorage.getItem('user'))
    const onCerrarSesion = () => {
        localStorage.removeItem('user')
    }
    return (
        <>
            <li>
                <a className="nav__link nav__link__profile" href="/profile">
                    <img src={`http://ddragon.leagueoflegends.com/cdn/12.10.1/img/profileicon/${user.iconId}.png`} alt="Summoner icon"
                        style={{ 'width': '50px' }} />
                    <h4>{user.summonerName}</h4>
                </a>
            </li>
            <li>
                <a className="nav__link" href="/" onClick={onCerrarSesion}>Cerrar sesión</a>
            </li>
        </>
    );
}

function Navbar() {
    const logo = '/images/logo192.png'
    return (
        <header>
            <nav className="nav">
                <ul className="nav--left">
                    <li className="nav__logo">
                        <a href="/">
                            <img className="nav__img" src={logo} alt="logo" />
                        </a>
                    </li>
                    <li>
                        <a href="/" className="nav__link">Inicio</a>
                    </li>
                    <li>
                        <a href="/champions" className="nav__link">Campeones</a>
                    </li>
                </ul>
                <ul className="nav--center">
                    <li className="nav__searchbar">
                        <input type="text" className="searchbar__input" name="summoner_nav" placeholder="Buscar..." />
                        <select className="searchbar__select">
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
                        <button className="searchbar__btn">
                            <img className="searchbar__img" src="https://icon-library.com/images/search-icon-transparent/search-icon-transparent-27.jpg" alt="searc hicon" />
                        </button>
                    </li>
                </ul>
                <ul className="nav--right">
                    {
                        localStorage.getItem('user') ? <Logged /> : <NotLogged />
                    }
                </ul>
            </nav>
        </header>
    );
}

function Footer() {
    return (
        <footer>
            <div className="footer__container">
                <div className="footer__about">
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
                <div className="footer__copyright">
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

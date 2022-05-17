import React from 'react'
import Navbar, { Footer } from '../components/NavBar'
import '../css/home.css'

export default function Home() {
    return (
        <body>
            <Navbar />
            <div className='container'>
                <h1>
                    Poro Opresor
                </h1>
                <h2>
                    Analiza tus partidas
                </h2>
                <img src="https://i.blogs.es/7ffac0/league-of-legends/1366_2000.jpeg" alt="imagen inicio" />
                <ul>
                    <li>
                        <div className='container-mensajes'>
                            <h3>Diviértete juega y gana</h3>
                            <img src='https://c4.wallpaperflare.com/wallpaper/792/505/200/video-game-league-of-legends-photoshop-victory-wallpaper-preview.jpg' alt="imagen diviertete juega y gana" />
                        </div>
                    </li>
                    <li>
                        <div className='container-mensajes'>
                            <h3>Mira el desempeño de tus partidas</h3>
                            <img src='https://images2.minutemediacdn.com/image/upload/c_fill,w_912,h_516,f_auto,q_auto,g_auto/shape/cover/sport/5b69e2f771ef9956fb000044.jpeg' alt="imagen mira el desempeño de tus partidas" />
                        </div>
                    </li>
                </ul>
            </div>
            <Footer />
        </body>
    )
}

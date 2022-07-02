import axios from 'axios';
import React, { useState } from 'react'
import Navbar, { Footer } from '../components/NavFooter';
import GamePlaceholder from '../components/GamePlaceholder';
import { useNavigate } from 'react-router-dom';



function TopMatches() {
    const navigate = useNavigate()
    const [date, setDate] = useState({
        'date1': '',
        'date2': ''
    });
    const [dateInMillis, setDateInMillis] = useState({
        'date1': '',
        'date2': ''
    });
    const [gameData, setGameData] = useState([])
    const onChange = e => {
        const { name, value } = e.target
        setDate({
            ...date,
            [name]: value
        })
        var date1 = new Date(date.date1 + ' 00:00:00')
        var date2 = new Date(date.date2 + ' 00:00:00')
        setDateInMillis({
            'date1': date1.getTime(),
            'date2': date2.getTime()
        })
    }
    const getTopGames = async () => {
        
        console.log(dateInMillis);
        await axios(`https://localhost:7163/api/Games/2/${dateInMillis.date1}/${dateInMillis.date2}`)
            .then(r => {
                r.data.map(async (game) => {
                    await axios.get(`https://localhost:7163/api/GameStats?gameId=${game.gameId}`)
                        .then(async res => {
                            await axios.get(`https://localhost:7163/api/ChampionMasteries?id=${res.data.championId}`)
                                .then(async champName => {
                                    await axios.get(`https://localhost:7163/api/AdvancedGameStats/${res.data.statsId}`)
                                        .then(adv => {
                                            let games = {
                                                game: game,
                                                stats: res.data,
                                                advStats: adv.data,
                                                championName: champName.data
                                            }
                                            setGameData(oldArray => [
                                                ...oldArray,
                                                games
                                            ])
                                            setGameData(data => {
                                                const sorted = [...data]
                                                sorted.sort((a, b) => b.game.score - a.game.score)
                                                return sorted
                                            })
                                        })
                                })
                        })
                })
            })
    }

    const onRowClick = (data) => {
        navigate('/match/' + data.game.gameId, { state: data })
    }
    return (
        <>
            <Navbar />
            <input type='date' name='date1' onChange={(e) => onChange(e)} />
            <input type='date' name='date2' onChange={(e) => onChange(e)} />
            <button onClick={() => getTopGames()}>BUSCAR</button>
            <table>
                <tbody>
                    {gameData.map((game) => (
                        <GamePlaceholder key={game.game.gameId} game={game} onClick={onRowClick} />
                    ))}
                </tbody>
            </table>
            <Footer />
        </>
    )
}

export default TopMatches
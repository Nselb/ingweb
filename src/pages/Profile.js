import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ChampionPlaceholder from '../components/ChampionPlaceholder';
import GamePlaceholder from '../components/GamePlaceholder';
import Navbar, { Footer } from '../components/NavFooter';
import RankPlaceholder from '../components/RankPlaceholder';
import '../css/Profile.css'

function Profile() {

    const navigate = useNavigate()
    const [champData, setChampData] = useState([])
    const [gameData, setGameData] = useState([])
    const [rankData, setRankData] = useState([])
    const user = JSON.parse(localStorage.getItem('user'))
    let i = 0
    const onRowClick = (data) => {
        navigate('/match/' + data.game.gameId, { state: data })
    }
    useEffect(() => {
        if (!localStorage.getItem('user')) {
            navigate('/')
        }
    }, [navigate])

    useEffect(() => {
        console.log(user)
        const getGameData = async (r) => {
            r.data.map(async (game) => {
                await axios.get(`https://apiporo.azurewebsites.net/api/GameStats?gameId=${game.gameId}`)
                    .then(async res => {
                        console.log(res);
                        await axios.get(`https://apiporo.azurewebsites.net/api/ChampionMasteries?id=${res.data.championId}`)
                            .then(async champName => {
                                await axios.get(`https://apiporo.azurewebsites.net/api/AdvancedGameStats/${res.data.statsId}`)
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
                                            sorted.sort((a, b) => b.game.gameStartTimestamp - a.game.gameStartTimestamp)
                                            return sorted
                                        })
                                    })
                            })
                    })
            })
        }

        const getGames = async () => {
            await axios.get(`https://apiporo.azurewebsites.net/api/Games/${user.summonerId}`)
                .then(async r => {
                    console.log(r);
                    await axios.get(`https://apiporo.azurewebsites.net/api/Games?ID=${user.summonerId}&PUUID=${user.puuid}&server=${user.regionId}`)
                        .then(res => {
                            getGameData(res)
                        })
                })
        }

        const getMasteryData = async () => {
            await axios.get(`https://apiporo.azurewebsites.net/api/ChampionMasteries/${user.summonerId}`)
                .then(r => {
                    console.log(r);
                    if (r.data.length < 1) {
                        axios.post(`https://apiporo.azurewebsites.net/api/ChampionMasteries?summonerId=${user.summonerId}&regionId=${user.regionId}`)
                            .then(res => {
                                setChampData(res.data)
                            })
                    } else {
                        setChampData(r.data)
                    }
                })
        }

        const getLeagueData = async () => {
            await axios.get(`https://apiporo.azurewebsites.net/api/Leagues?id=${user.summonerId}&regionId=${user.regionId}`)
                .then(r => {
                    setRankData(r.data)
                })
        }
        if (i > 0) {
            getMasteryData()
            getGames()
            getLeagueData()
        }
        i++
    }, [user.puuid, user.regionId, user.summonerId, i, gameData])


    return (
        <>
            <Navbar />
            <div className='profile__container'>
                <section className="ranked__container">
                    <button>Actualizar datos</button>
                    {rankData.map((league) => (
                        <RankPlaceholder key={league.id} league={league} />
                    ))}
                </section>
                <section className='games__container'>
                    <table className="table--games">
                        <tbody className='games__body'>
                            {gameData.map((game) => (
                                <GamePlaceholder key={game.game.gameId} game={game} onClick={onRowClick}/>
                            ))}
                        </tbody>
                    </table>
                </section>
                <section className='masteries__container'>
                    <table className='table--masteries'>
                        <thead className='masteries__head'>
                            <tr>
                                <th>
                                    Champion
                                </th>
                                <th>
                                    Mastery Points
                                </th>
                            </tr>
                        </thead>
                        <tbody className='masteries__body'>
                            {champData.map((champion) => (
                                <ChampionPlaceholder key={champion.championId} champion={{
                                    name: champion.championName,
                                    mastery: champion.championLevel,
                                    masteryPoints: champion.championPoints
                                }} />
                            ))}
                        </tbody>
                    </table>
                </section>
            </div>
            <Footer />
        </>
    );
}

export default Profile;
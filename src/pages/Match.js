import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar, { Footer } from '../components/NavFooter'
import GamePlaceholder from '../components/GamePlaceholder'
import StatsPlaceholder from '../components/StatsPlaceholder'

function Match() {

    let i = 0

    const location = useLocation()
    const data = location.state
    const [gameData, setGameData] = useState([])
    const [otherGame, setOtherGame] = useState({})

    const getGamesFromChamp = async (championId, summonerId) => {
        await axios(`https://localhost:7163/api/Games/${championId}/${summonerId}`)
            .then(res => {
                getGameData(res)
            })
    }

    const getGameData = async (r) => {
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
                                        sorted.sort((a, b) => b.game.gameStartTimestamp - a.game.gameStartTimestamp)
                                        return sorted
                                    })
                                })
                        })
                })
        })
    }

    useEffect(() => {
        if (i > 0) {
            getGamesFromChamp(data.stats.championId, data.game.summonerId)
        }
        i++
    }, [])

    const onCompareClick = (gameData) => {
        console.log(gameData);
        setOtherGame(gameData)
    }

    return (
        <>
            <Navbar />

            Comparar con:
            <section className='games__container'>
                <table className="table--games">
                    <tbody className='games__body'>
                        {gameData.map((game) => (
                            data.game.gameId !== game.game.gameId && <GamePlaceholder key={game.game.gameId} game={game} onClick={onCompareClick} />
                        ))}
                    </tbody>
                </table>
            </section>
            <table>
                <tbody>
                    <GamePlaceholder game={data} />
                </tbody>
            </table>
            <StatsPlaceholder data={data} />

            {otherGame.advStats &&
                <>
                    <table>
                        <tbody>
                            <GamePlaceholder game={otherGame} />
                        </tbody>
                    </table>
                    <StatsPlaceholder data={otherGame} />
                </>
            }
            <Footer />
        </>
    )
}

export default Match
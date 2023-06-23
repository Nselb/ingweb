import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ChampionPlaceholder from '../components/ChampionPlaceholder';
import Navbar, { Footer } from '../components/NavFooter';
import RankPlaceholder from '../components/RankPlaceholder';
import '../css/Profile.css'

function Profile() {

    const navigate = useNavigate()
    const [champData, setChampData] = useState([])
    const [rankData, setRankData] = useState([])
    const user = JSON.parse(localStorage.getItem('user'))
    let i = 0
    useEffect(() => {
        if (!localStorage.getItem('user')) {
            navigate('/')
        }
    }, [navigate])

    useEffect(() => {
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
                }).catch(e => {
                    console.error(e);
                    axios.post(`https://apiporo.azurewebsites.net/api/ChampionMasteries?summonerId=${user.summonerId}&regionId=${user.regionId}`)
                            .then(res => {
                                setChampData(res.data)
                            })
                })
        }
        const getLeagueData = async () => {
            await axios.get(`https://apiporo.azurewebsites.net/api/Leagues?id=${user.summonerId}&regionId=${user.regionId}`)
                .then(r => {
                    setRankData(r.data)
                })
        }
        getMasteryData()
        getLeagueData()

    }, [user.puuid, user.regionId, user.summonerId, i])


    return (
        <>
            <Navbar />
            <div className='profile__container'>
                <section className="ranked__container">
                    {rankData.map((league) => (
                        <RankPlaceholder key={league.id} league={league} />
                    ))}
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
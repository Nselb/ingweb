import md5 from 'md5';
import axios from 'axios';
import Cookies from 'universal-cookie';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/js/dist/dropdown'
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar/NavBar';
import React, { useState } from 'react'
import Select from 'react-select'

export default function Register() {

    const baseUrl = 'https://localhost:7298/api/';
    const [data, setData] = useState([]);
    const cookies = new Cookies();
    const navigate = useNavigate();

    const regions = [
        { value: 'LA1', label: 'LAN' },
        { value: 'LA2', label: 'LAS' },
        { value: 'BR1', label: 'BR' },
        { value: 'EUN1', label: 'EUNE' },
        { value: 'JP1', label: 'JP' },
        { value: 'KR', label: 'KR' },
        { value: 'NA1', label: 'NA' },
        { value: 'OC1', label: 'OC' },
        { value: 'RU', label: 'RU' },
        { value: 'TR1', label: 'TR' }
    ]

    const [selectedUser, setSelectedUser] = useState({
        UsuarioID: 0,
        RegionID: '',
        SummonerID: '',
        UsuarioName: '',
        UsuarioPassword: '',
        UsuarioEmail: '',
        UsuarioAdmin: false
    })

    const summoner = {
        iD: '',
        accountID: '',
        pUUID: '',
        summonerName: '',
        profileIconID: 0,
        summonerLevel: 0
    }

    const [selectedUN, setSelectedUN] = useState({
        SummonerName: ''
    })

    const handleSnChange = e => {
        const { name, value } = e.target;
        cookies.remove('invalidSN', { path: '/', domain: 'localhost' })
        setSelectedUN({
            ...selectedUN,
            [name]: value
        })
    }

    const [selectedRegion, setSelectedRegion] = useState(1);

    const handleDWChange = e => {
        setSelectedRegion(e.value)
    }

    const handleChange = e => {
        const { name, value } = e.target;
        setSelectedUser({
            ...selectedUser,
            [name]: value
        });
    }

    const handleEmail = (email) => {

        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (re.test(email)) {
            // this is a valid email address
            // call setState({email: email}) to update the email
            // or update the data in redux store.
        }
        else {
            // invalid email, maybe show an error to the user.
        }

    }

    const postUsuario = async () => {
        delete selectedUser.UsuarioID;
        console.log(selectedUser.UsuarioPassword);
        selectedUser.UsuarioPassword = md5(selectedUser.UsuarioPassword);
        console.log(selectedUser.UsuarioPassword);
        await axios.get(`https://${selectedRegion}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${selectedUN.SummonerName}`, { params: { api_key: 'RGAPI-0b971178-9b0f-4f60-aec1-4cde05a8f686' } })
            .then(r => {
                cookies.remove('invalidSN', { path: '/', domain: 'localhost' })
                selectedUser.SummonerID = r.data.id
                selectedUser.RegionID = selectedRegion
                summoner.accountID = r.data.accountId
                summoner.iD = selectedUser.SummonerID
                summoner.pUUID = r.data.puuid
                summoner.profileIconID = r.data.profileIconId
                summoner.summonerLevel = r.data.summonerLevel
                summoner.summonerName = r.data.name
                cookies.set('summoner', summoner)
                axios.post(`${baseUrl}summoner`, summoner)
                    .then(r => {
                        axios.post(`${baseUrl}users`, selectedUser)
                            .then(r => {
                                setData(data.concat(r.data));
                                cookies.set('user', r.data)
                                console.log(cookies.get('user'));
                            }).catch(e => {
                                console.log(e);
                            })
                    }).catch(e => {
                        cookies.set('invalidSN', true, { path: '/', domain: 'localhost' })
                        navigate('/register')
                    })
            }).catch(e => {
                console.log(e);
                cookies.set('invalidSN', true, { path: '/', domain: 'localhost' })
                navigate('/register')
            })
    }


    const renderSN = () => {
        if (!cookies.get('invalidSN')) {
            return <input type='text' placeholder='Nombre de invocador' className={'form-control'} name='SummonerName' onChange={handleSnChange} />
        } else {
            return <input type='text' placeholder='Nombre de invocador' className={'form-control is-invalid'} name='SummonerName' onChange={handleSnChange} />
        }
    }

    const alertManager = () => {
        if (cookies.get('invalidSN')) {
            return (<div className="alert alert-danger" role="alert">Invocador no existe</div>)
        }
    }

    return (
        <div>
            <Navbar />
            <div className='container-fluid-sm px-1 py-5 mx-auto w-50 align-middle'>
                <div className='form-card border border rounded p-2 bg-light'>
                    <h1 className='display-6 text-center'>Registrarse</h1>
                    {alertManager()}
                    <div className='row g-2 m-auto'>
                        <div className='col'>
                            {renderSN()}
                        </div>
                        <div className='col-auto'>
                            <Select placeholder='Region' onChange={handleDWChange} defaultValue={'Region'} options={regions} />
                        </div>
                    </div>
                    <div className='row g-2 m-auto'>
                        <div className='col'>
                            <input type='text' placeholder='Nombre' className='form-control' name='UsuarioName' onChange={handleChange} />
                        </div>
                    </div>
                    <div className='row g-2 m-auto'>
                        <div className='col'>
                            <input type='email' placeholder='E-mail' className='form-control' name='UsuarioEmail' onChange={handleChange} />
                        </div>
                    </div>
                    <div className='row g-2 m-auto'>
                        <div className='col'>
                            <input type='password' placeholder='Contraseña' className='form-control' name='UsuarioPassword' onChange={handleChange} />
                        </div>
                    </div>
                    <div className='row g-2 m-auto'>
                        <div className='col text-center'>
                            <button className='btn btn-primary' onClick={() => postUsuario()}>Registrarse</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

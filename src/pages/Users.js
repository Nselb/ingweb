import axios from 'axios';
import Cookies from 'universal-cookie';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar/NavBar';
import React, { useState, useEffect } from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';


function CRUD() {

    const cookies = new Cookies();
    const navigate = useNavigate();

    const baseUrl = 'https://localhost:7298/api/';
    const [data, setData] = useState([]);
    const [modalInsertar, setModalInsertar] = useState(false);
    const [modalEditar, setModalEditar] = useState(false);
    const [modalEliminar, setModalEliminar] = useState(false);
    const [selectedUser, setSelectedUser] = useState({
        usuarioID: 0,
        regionID: '',
        summonerID: '',
        usuarioName: '',
        usuarioPassword: '',
        usuarioEmail: '',
        usuarioAdmin: false
    })

    const handleChange = e => {
        const { name, value } = e.target;
        setSelectedUser({
            ...selectedUser,
            [name]: value
        });
    }

    const toogleModalInsertar = () => {
        setModalInsertar(!modalInsertar);
    }
    const toogleModalEditar = () => {
        setModalEditar(!modalEditar);
    }
    const toogleModalEliminar = () => {
        setModalEliminar(!modalEliminar);
    }

    const getUsuarios = async () => {
        await axios.get(`${baseUrl}users`)
            .then(response => {
                setData(response.data);
            }).catch(e => {
                console.log(e);
            })
    }

    const postUsuarios = async () => {
        delete selectedUser.userId;
        await axios.post(`${baseUrl}users`, selectedUser)
            .then(response => {
                setData(data.concat(response.data));
                toogleModalInsertar();
            }).catch(e => {
                console.log(e);
            })
    }

    const putUsuarios = async () => {
        await axios.put(`${baseUrl}users/${selectedUser.usuarioID}`, selectedUser)
            .then(response => {
                var res = response.data;
                var aux = data;
                aux.map(user => {
                    if (user.userId === selectedUser.userId) {
                        user.userLoginName = res.userLoginName;
                        user.userName = res.userName;
                        user.userLastName = res.userLastName;
                    }
                    return user;
                })
                toogleModalEditar();
            }).catch(e => {
                console.log(e);
            })
    }

    const deleteUsuario = async () => {
        await axios.delete(`${baseUrl}users/${selectedUser.usuarioID}`)
            .then(response => {
                axios.delete(`${baseUrl}summoner/${selectedUser.summonerID}`)
                getUsuarios();
                toogleModalEliminar();
            }).catch(e => {
                console.log(e);
            })
    }

    const seleccionarUsuario = (user, caso) => {
        setSelectedUser(user);
        (caso === 'Editar') ? toogleModalEditar() : toogleModalEliminar();
    }

    function nameFormatter(value) {
        var str = '';
        var i = 0;
        for (i = 0; i < value.length; i++) {
            str = str + '•';
        }
        return str;
    }

    useEffect(() => {
        getUsuarios();
        if (!cookies.get('user')) {
            navigate('/')
        } else if (!cookies.get('user').usuarioAdmin) {
            navigate('/')
        }
    }, [])


    return (

        <div className='App'>
            <Navbar />
            <br /><br />
            <button className='btn btn-success' onClick={() => toogleModalInsertar()}>Insertar Usuario</button>
            <br /><br />
            <table className='table table-stripped table-sm'>
                <thead>
                    <tr>
                        <th className='text-center'>ID</th>
                        <th className='text-center'>Region</th>
                        <th className='text-center'>SummonerID</th>
                        <th className='text-center'>Nombre</th>
                        <th className='text-center'>E-Mail</th>
                        <th className='text-center'>Contraseña</th>
                        <th className='text-center'>Admin</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(user => (
                        <tr key={user.usuarioID}>
                            <td className='text-center'>{user.usuarioID}</td>
                            <td className='text-center'>{user.regionID}</td>
                            <td className='text-center'>{user.summonerID}</td>
                            <td className='text-center'>{user.usuarioName}</td>
                            <td className='text-center'>{user.usuarioEmail}</td>
                            <td className='text-center'>{nameFormatter(user.usuarioPassword)}</td>
                            <td className='text-center'>{user.usuarioAdmin ? 'Si' : 'No'}</td>
                            <td className='text-center'>
                                <button className='btn btn-primary ms-1' onClick={() => seleccionarUsuario(user, 'Editar')}>Editar</button>
                                <button className='btn btn-danger ms-1' onClick={() => seleccionarUsuario(user, 'Eliminar')}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Modal isOpen={modalInsertar}>
                <ModalHeader>Insertar Usuario</ModalHeader>
                <ModalBody>
                    <div className='form-group'>
                        <label>Username: </label>
                        <br />
                        <input type='text' className='form-control' name='userLoginName' onChange={handleChange} />
                        <br />
                        <label>Nombre: </label>
                        <br />
                        <input type='text' className='form-control' name='userName' onChange={handleChange} />
                        <br />
                        <label>Apellido: </label>
                        <br />
                        <input type='text' className='form-control' name='userLastName' onChange={handleChange} />
                        <br />
                        <label>Contraseña: </label>
                        <br />
                        <input type='password' className='form-control' name='userPassword' onChange={handleChange} />
                        <br />
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className='btn btn-primary' onClick={() => postUsuarios()}>Insertar</button>
                    <br />
                    <button className='btn btn-danger' onClick={() => toogleModalInsertar()}>Cancelar</button>
                    <br />
                </ModalFooter>
            </Modal>

            <Modal isOpen={modalEditar}>
                <ModalHeader>Editar Usuario</ModalHeader>
                <ModalBody>
                    <div className='form-group'>
                        <label>ID: </label>
                        <br />
                        <input type='text' className='form-control' readOnly value={selectedUser && selectedUser.userId} />
                        <br />
                        <label>Username: </label>
                        <br />
                        <input type='text' className='form-control' onChange={handleChange} name='userLoginName' value={selectedUser && selectedUser.userLoginName} />
                        <br />
                        <label>Nombre: </label>
                        <br />
                        <input type='text' className='form-control' onChange={handleChange} name='userName' value={selectedUser && selectedUser.userName} />
                        <br />
                        <label>Apellido: </label>
                        <br />
                        <input type='text' className='form-control' onChange={handleChange} name='userLastName' value={selectedUser && selectedUser.userLastName} />
                        <br />
                        <label>Contraseña: </label>
                        <br />
                        <input type='password' className='form-control' name='userPassword' onChange={handleChange} />
                        <br />
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className='btn btn-primary' onClick={() => putUsuarios()}>Guardar</button>
                    <button className='btn btn-danger' onClick={() => toogleModalEditar()}>Cancelar</button>
                </ModalFooter>
            </Modal>

            <Modal isOpen={modalEliminar}>
                <ModalHeader>Eliminar Usuario</ModalHeader>
                <ModalBody>
                    ¿Quiere borrar al usuario {selectedUser && selectedUser.userName}?
                </ModalBody>
                <ModalFooter>
                    <button className='btn btn-danger' onClick={() => deleteUsuario()}>Si</button>
                    <button className='btn btn-primary' onClick={() => toogleModalEliminar()}>No</button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default CRUD;

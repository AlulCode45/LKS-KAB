import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
    const [idCard, setIdCard] = useState()
    const [password, setPassword] = useState()
    const [loginError, setLoginError] = useState(false)
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()
        return await axios.post(import.meta.env.VITE_API + 'login', {
            id_card_number: idCard,
            password: password
        }).then(res => {
            sessionStorage.setItem('token', res?.data?.token)
            sessionStorage.setItem('user', JSON.stringify(res?.data))
            navigate('/dashboard')
        }).catch((err) => {
            setLoginError(true)
        })
    }
    return (
        <>

            <div className="navbar navbar-expand-lg bg-primary ">
                <div className="container">
                    <div className="navbar-brand text-white fw-bolder">Vaccination Platform</div>
                    <button className="navbar-toggler">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="navbar-collapse collapse">
                        <nav className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <a href="#" className="nav-link text-white">Login</a>
                            </li>
                        </nav>
                    </div>
                </div>
            </div>

            <div className="container vh-100 d-flex align-items-center justify-content-center">
                <div className="card w-50">
                    <div className="card-header">
                        Login Aplikasi
                    </div>
                    <div className="card-body">
                        {
                            loginError ? (
                                <div className="alert alert-danger">
                                    ID Card Number or Password incorrect
                                </div>
                            ) : ''
                        }
                        <form onSubmit={handleLogin}>
                            <div className="form-group">
                                <label for="">ID CARD NUMBER</label>
                                <input type="text" id="id_card" className="form-control" onChange={e => setIdCard(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label for="">Password</label>
                                <input type="password" id="password" className="form-control" onChange={e => setPassword(e.target.value)} />
                            </div>
                            <div className="d-flex justify-content-end">
                                <button type="submit" className="btn btn-primary mt-3">Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

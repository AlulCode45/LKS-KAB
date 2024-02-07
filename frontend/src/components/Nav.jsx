import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Nav() {
    const [user, setUser] = useState()
    const getUser = () => {
        setUser(JSON.parse(sessionStorage.getItem('user')))
    }
    const navigate = useNavigate()
    const authApp = () => {
        if (!sessionStorage.getItem('token') || !sessionStorage.getItem('user')) {
            navigate('/')
        }
    }
    const handleLogout = async () => {
        return await axios.post(import.meta.env.VITE_API + 'logout', {}, {
            params: {
                token: sessionStorage.getItem('token')
            }
        }).then(res => {
            sessionStorage.clear()
            alert('Logout berhasil')
            navigate('/')
        }).catch(err => {
            console.log(err);
        })
    }
    useEffect(() => {
        getUser()
        authApp()
    }, [])
    return (
        <div className="navbar navbar-expand-lg bg-primary ">
            <div className="container">
                <div className="navbar-brand text-white fw-bolder">Vaccination Platform</div>
                <button className="navbar-toggler">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="navbar-collapse collapse">
                    <nav className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <a href="#" className="nav-link text-white">{user?.name}</a>
                        </li>
                        <li className="nav-item">
                            <a onClick={handleLogout} className="nav-link text-white">Logout</a>
                        </li>
                    </nav>
                </div>
            </div>
        </div>
    )
}

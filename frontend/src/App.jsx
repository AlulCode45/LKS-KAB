import React from 'react'
import { BrowserRouter, Route, RouterProvider, Routes } from 'react-router-dom'

import './assets/css/bootstrap.min.css'
import Login from './auth/Login'
import Dashboard from './dashboard/Dashboard'
import Vaccination from './dashboard/vaccination/Vaccination'
import DetailVaccination from './dashboard/vaccination/DetailVaccination'
import Layout from './components/Layout'
import Consultation from './dashboard/consultation/Consultation'

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login />} />

                <Route element={<Layout />}>
                    <Route path='/dashboard' element={<Dashboard />} />
                    <Route path='/dashboard/consultation' element={<Consultation />} />
                    <Route path='/dashboard/vaccination/:dose' element={<Vaccination />} />
                    <Route path='/dashboard/vaccination/:dose/:id' element={<DetailVaccination />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

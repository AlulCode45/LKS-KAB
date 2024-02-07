import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function DetailVaccination() {

    const [date, setDate] = useState(null)
    const [massage, setMassage] = useState()
    const [spot, setSpot] = useState()
    const { id } = useParams()
    const navigate = useNavigate(``)

    const getSpot = async () => {
        return await axios.get(import.meta.env.VITE_API + 'spots/' + id, {
            params: {
                token: sessionStorage.getItem('token'),
                date: date
            }
        }).then(res => {
            setSpot(res?.data)
            console.log(res);
        }).catch(err => console.log(err))
    }
    const handleRegister = async () => {
        return await axios.post(import.meta.env.VITE_API + 'vaccinations', {
            spot_id: id,
            date: date
        }, {
            params: {
                token: sessionStorage.getItem('token')
            }
        }).then(res => {
            alert('Request vaccine success')
            navigate('/dashboard')
        }).catch(err => {
            setMassage(err?.response?.data?.message)
        })
    }

    useEffect(() => {
        getSpot()
    }, [])


    return (
        <>
            <main className="container mt-5 mb-5">
                <div className="row align-items-center">
                    <div className="col-6">
                        <h1>First Vaccination</h1>
                        <span className="fs-6">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quae quos, doloribus
                            distinctio delectus deleniti</span>
                    </div>
                    <div className="col-6 d-flex justify-content-end">
                        <div className="">
                            <button className="btn btn-primary" onClick={handleRegister}>Register Vaccine</button>
                        </div>
                    </div>
                </div>

                <div className="row mt-5">
                    <div className="col-md-2">
                        <b>Select vaccination date</b>
                        <input type="date" className="form-control" onChange={e => setDate(e.target.value)} />
                    </div>
                </div>

                {
                    massage ? (
                        <div className="alert alert-danger mt-5">
                            {massage}
                        </div>
                    ) : ''
                }
                <section className="row row-cols-md-3 row-cols-1 mt-5">
                    <div className="col">
                        <div className="card">
                            <div className="card-header bg-white d-flex justify-content-between">
                                <b>Session 1</b>
                                <span>09:00 - 11:00</span>
                            </div>
                            <div className="card-body row row-cols-md-4 row-cols-1 gap-4 d-flex justify-content-center">
                                <div className={"col border text-center py-4 " + (spot?.vaccinations_count >= 1 ? 'border-success' : '') + (spot?.vaccinations_count + 1 == 1 ? ' bg-primary text-white' : 'bg-light')}>
                                    <b>#1</b>
                                </div>
                                <div className={"col border text-center py-4 " + (spot?.vaccinations_count >= 2 ? 'border-success' : '') + (spot?.vaccinations_count + 1 == 2 ? ' bg-primary text-white' : 'bg-light')}>
                                    <b>#2</b>
                                </div>
                                <div className={"col border text-center py-4 " + (spot?.vaccinations_count >= 3 ? 'border-success' : '') + (spot?.vaccinations_count + 1 == 3 ? ' bg-primary text-white' : 'bg-light')}>
                                    <b>#1</b>
                                </div>
                                <div className={"col border text-center py-4 " + (spot?.vaccinations_count >= 4 ? 'border-success' : '') + (spot?.vaccinations_count + 1 == 4 ? ' bg-primary text-white' : 'bg-light')}>
                                    <b>#2</b>
                                </div>
                                <div className={"col border text-center py-4 " + (spot?.vaccinations_count >= 5 ? 'border-success' : '') + (spot?.vaccinations_count + 1 == 5 ? ' bg-primary text-white' : 'bg-light')}>
                                    <b>#3</b>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card">
                            <div className="card-header bg-white d-flex justify-content-between">
                                <b>Session 2</b>
                                <span>09:00 - 11:00</span>
                            </div>
                            <div className="card-body row row-cols-md-4 row-cols-1 gap-4  d-flex justify-content-center">
                                <div className={"col border text-center py-4 " + (spot?.vaccinations_count >= 6 ? 'border-success' : '') + (spot?.vaccinations_count + 1 == 6 ? ' bg-primary text-white' : 'bg-light')}>
                                    <b>#1</b>
                                </div>
                                <div className={"col border text-center py-4 " + (spot?.vaccinations_count >= 7 ? 'border-success' : '') + (spot?.vaccinations_count + 1 == 7 ? ' bg-primary text-white' : 'bg-light')}>
                                    <b>#2</b>
                                </div>
                                <div className={"col border text-center py-4 " + (spot?.vaccinations_count >= 8 ? 'border-success' : '') + (spot?.vaccinations_count + 1 == 8 ? ' bg-primary text-white' : 'bg-light')}>
                                    <b>#1</b>
                                </div>
                                <div className={"col border text-center py-4 " + (spot?.vaccinations_count >= 9 ? 'border-success' : '') + (spot?.vaccinations_count + 1 == 9 ? ' bg-primary text-white' : 'bg-light')}>
                                    <b>#2</b>
                                </div>
                                <div className={"col border text-center py-4 " + (spot?.vaccinations_count >= 10 ? 'border-success' : '') + (spot?.vaccinations_count + 1 == 10 ? ' bg-primary text-white' : 'bg-light')}>
                                    <b>#3</b>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card">
                            <div className="card-header bg-white d-flex justify-content-between">
                                <b>Session 3</b>
                                <span>09:00 - 11:00</span>
                            </div>
                            <div className="card-body row row-cols-md-4 row-cols-1 gap-4  d-flex justify-content-center">
                                <div className={"col border text-center py-4 " + (spot?.vaccinations_count >= 11 ? 'border-success' : '') + (spot?.vaccinations_count + 1 == 11 ? ' bg-primary text-white' : 'bg-light')}>
                                    <b>#1</b>
                                </div>
                                <div className={"col border text-center py-4 " + (spot?.vaccinations_count >= 12 ? 'border-success' : '') + (spot?.vaccinations_count + 1 == 12 ? ' bg-primary text-white' : 'bg-light')}>
                                    <b>#2</b>
                                </div>
                                <div className={"col border text-center py-4 " + (spot?.vaccinations_count >= 13 ? 'border-success' : '') + (spot?.vaccinations_count + 1 == 13 ? ' bg-primary text-white' : 'bg-light')}>
                                    <b>#1</b>
                                </div>
                                <div className={"col border text-center py-4 " + (spot?.vaccinations_count >= 14 ? 'border-success' : '') + (spot?.vaccinations_count + 1 == 14 ? ' bg-primary text-white' : 'bg-light')}>
                                    <b>#2</b>
                                </div>
                                <div className={"col border text-center py-4 " + (spot?.vaccinations_count >= 15 ? 'border-success' : '') + (spot?.vaccinations_count + 1 == 15 ? ' bg-primary text-white' : 'bg-light')}>
                                    <b>#3</b>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}

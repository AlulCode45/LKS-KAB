import axios from 'axios'
import React, { useEffect, useState } from 'react'

function Dashboard() {
    const [consultations, setConsultations] = useState()
    const [vaccinations, setVaccinations] = useState()

    const getConsultation = async () => {
        return await axios.get(import.meta.env.VITE_API + 'consultations', {
            params: {
                token: sessionStorage.getItem('token')
            }
        }).then(res => {
            setConsultations(res?.data?.consultation)
        }).catch(err => {
            console.log(err);
        })
    }
    const getVaccination = async () => {
        return axios.get(import.meta.env.VITE_API + 'vaccinations', {
            params: {
                token: sessionStorage.getItem('token')
            }
        }).then(res => {
            setVaccinations(res?.data?.vaccinations)
        }).catch(err => console.log(err))
    }

    useEffect(() => {
        getConsultation()
        getVaccination()
    }, [])
    return (
        <>
            <main className="container mt-5 mb-5">
                <h1>Dashboard</h1>

                <section className="mt-5">
                    <span className="fs-4">My Consultation</span>
                    <div className="row row-cols-md-4 row-cols-1 mt-3">
                        <div className="col mt-3">
                            <div className="card">
                                <div className="card-header"><b>Consultations</b></div>
                                <div className="card-body">
                                    <a href="/dashboard/consultation" className="text-decoration-none">+ Request Consultation</a>
                                </div>
                            </div>
                        </div>
                        {
                            consultations?.map((data, i) => (
                                <div className="col mt-3">
                                    <div className="card">
                                        <div className="card-header fw-bolder">Consultation</div>
                                        <div className="card-body p-0">
                                            <table className="table table-striped">
                                                <tbody>
                                                    <tr>
                                                        <td>Status</td>
                                                        <td>
                                                            <span className={"badge bg-" + (data?.status == 'accepted' ? 'primary' : data?.status == 'declined' ? 'danger' : 'info ')}>
                                                                {data?.status}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>Disease History</td>
                                                        <td>
                                                            <span>
                                                                {data?.disease_history}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>Current Symptoms</td>
                                                        <td>
                                                            <span>
                                                                {data?.current_symptoms}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>Doctor Name</td>
                                                        <td>
                                                            <span>
                                                                {data?.doctor?.name}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>Doctor Notes</td>
                                                        <td>
                                                            <span>
                                                                {data?.doctor_notes}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </section>

                <section className="mt-5">
                    <span className="fs-4">My Vaccinations</span>

                    {
                        consultations?.[0]?.status != 'accepted' ? (
                            <div className="alert alert-warning text-warning mt-3">
                                Your consultation must be approved by doctor to get vaccine
                            </div>
                        ) : ''
                    }
                    <div className="row row-cols-md-4 row-cols-1 mt-3">
                        <div className="col mt-3">
                            <div className="card">
                                <div className="card-header"><b>First Vaccination</b></div>
                                <div className="card-body">
                                    {
                                        !vaccinations?.first ? (
                                            <a href="/dashboard/vaccination/1" className="text-decoration-none">+ Request Vaccination</a>
                                        ) : ''
                                    }
                                </div>
                            </div>
                        </div>
                        {
                            vaccinations?.first ? (
                                <div className="col mt-3">
                                    <div className="card">
                                        <div className="card-header fw-bolder">First Vaccination</div>
                                        <div className="card-body p-0">
                                            <table className="table table-striped">
                                                <tbody>
                                                    <tr>
                                                        <td>Status</td>
                                                        <td>
                                                            <span className={"badge bg-" + (vaccinations?.first?.status == 'accepted' ? 'primary' : vaccinations?.first?.status == 'declined' ? 'danger' : 'info ')}>
                                                                {vaccinations?.first?.status}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>Date</td>
                                                        <td>
                                                            <span>
                                                                {vaccinations?.first?.date}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>Spot</td>
                                                        <td>
                                                            <span>
                                                                {vaccinations?.first?.spot?.name}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>Vaccine</td>
                                                        <td>
                                                            <span>
                                                                {vaccinations?.first?.vaccine?.name}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>Vaccinator</td>
                                                        <td>
                                                            <span>
                                                                {vaccinations?.first?.vaccinator?.name}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            ) : ''
                        }
                    </div>
                    <div className="row row-cols-md-4 row-cols-1 mt-3">
                        <div className="col mt-3">
                            <div className="card">
                                <div className="card-header"><b>Second Vaccination</b></div>
                                <div className="card-body">
                                    {
                                        !vaccinations?.second ? (
                                            <a href="/dashboard/vaccination/2" className="text-decoration-none">+ Request Vaccination</a>
                                        ) : ''
                                    }
                                </div>
                            </div>
                        </div>
                        {
                            vaccinations?.second ? (
                                <div className="col mt-3">
                                    <div className="card">
                                        <div className="card-header fw-bolder">Second Vaccination</div>
                                        <div className="card-body p-0">
                                            <table className="table table-striped">
                                                <tbody>
                                                    <tr>
                                                        <td>Status</td>
                                                        <td>
                                                            <span className={"badge bg-" + (vaccinations?.second?.status == 'accepted' ? 'primary' : vaccinations?.second?.status == 'declined' ? 'danger' : 'info ')}>
                                                                {vaccinations?.second?.status}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>Date</td>
                                                        <td>
                                                            <span>
                                                                {vaccinations?.second?.date}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>Spot</td>
                                                        <td>
                                                            <span>
                                                                {vaccinations?.second?.spot?.name}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>Vaccine</td>
                                                        <td>
                                                            <span>
                                                                {vaccinations?.second?.vaccine?.name}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>Vaccinator</td>
                                                        <td>
                                                            <span>
                                                                {vaccinations?.second?.vaccinator?.name}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            ) : ''
                        }
                    </div>
                </section>
            </main>
        </>
    )
}

export default Dashboard
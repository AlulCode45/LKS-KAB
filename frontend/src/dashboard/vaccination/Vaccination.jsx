import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

export default function Vaccination() {
    const { dose } = useParams()
    const [spots, setSpots] = useState()
    const navigate = useNavigate()

    const getSpots = async () => {
        return await axios.get(import.meta.env.VITE_API + 'spots', {
            params: {
                token: sessionStorage.getItem('token')
            }
        }).then(res => {
            setSpots(res?.data?.spots)
        })
    }

    useEffect(() => {
        getSpots()
    }, [])
    return (
        <>
            <main className="container mt-5 mb-5">
                <h1>First Vaccination</h1>

                <span className="fs-4">List Vaccination spots in {JSON.parse(sessionStorage.getItem('user'))?.regional?.district}</span>

                <div className="list-vaccine mt-5">

                    {
                        spots?.map((data, i) => (
                            <div className={'bg-light w-100 p-5 border-bottom border-1 align-items-center row row-cols-md-3 row-cols-1' + (dose != data?.serve ? ' opacity-50' : '')} onClick={() => {
                                if (dose == data?.serve) {
                                    navigate('/dashboard/vaccination/' + dose + '/' + data?.id)
                                }
                            }}>
                                <div className="col">
                                    <b className="text-primary">
                                        {data?.name}
                                    </b>
                                    <p>
                                        {
                                            data?.address
                                        }
                                    </p>
                                </div>
                                <div className="col">
                                    <b className='d-block'>Available Vaccine</b>
                                    {
                                        Object.keys(data?.available_vaccines)?.filter(vaksin => data?.available_vaccines[vaksin])?.map((data, i) => (
                                            <span>{data} ,</span>
                                        ))
                                    }
                                </div>
                                <div className="col">
                                    <b>Serve</b>
                                    <p>Only  {data?.serve == 1 ? 'First' : data?.serve == 2 ? 'Second' : 'Both'} vaccination</p>
                                </div>
                            </div>
                        ))
                    }

                </div>
            </main>
        </>
    )
}

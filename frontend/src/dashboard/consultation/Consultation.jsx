import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Consultation() {
    const [haveDisease, setHaveDisease] = useState('yes')
    const [haveSymptoms, setHaveSymptoms] = useState('no')
    const [symptoms, setSymptoms] = useState()
    const [disease, setDisease] = useState()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        return await axios.post(import.meta.env.VITE_API + 'consultations', {
            current_symptoms: symptoms,
            disease_history: disease
        }, {
            params: {
                token: sessionStorage.getItem('token')
            }
        }).then(res => {
            // console.log(res);
            alert('Request consultations success')
            navigate('/dashboard')
        }).catch(err => {
            console.log(err);
        })
    }
    return (
        <>
            <main className="container mt-5 mb-5">
                <h1>Request Consultation</h1>

                <form onSubmit={handleSubmit}>
                    <div className="d-flex gap-1 mt-5">
                        Do you have disease history now?
                        <select name="" id="" onChange={e => setHaveDisease(e.target.value)}>
                            <option value="yes">Yes, I have</option>
                            <option value="no">No, not have</option>
                        </select>
                    </div>

                    {
                        haveDisease == 'yes' ? (
                            <textarea name="" id="" cols="50" rows="10" placeholder="Describe your disease history"
                                className="form-control mt-2" onChange={e => setDisease(e.target.value)}></textarea>
                        ) : ''
                    }


                    <div className="d-flex gap-1 mt-5">
                        Do you have symptoms now?
                        <select name="" id="" onChange={e => setHaveSymptoms(e.target.value)}>
                            <option value="yes">Yes, I have</option>
                            <option value="no" selected>No, not have</option>
                        </select>
                    </div>
                    {
                        haveSymptoms == 'yes' ? (
                            <textarea name="" id="" cols="50" rows="10" placeholder="Describe your symptoms"
                                className="form-control mt-2" onChange={e => setSymptoms(e.target.value)}></textarea>
                        ) : ''
                    }
                    <button className="btn btn-primary mt-2" type='submit'>Send Request</button>
                </form>
            </main>
        </>
    )
}

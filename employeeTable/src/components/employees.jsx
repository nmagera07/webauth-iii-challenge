import React, {useEffect, useState} from 'react';
import axios from 'axios'
import {axiosWithAuth} from './axiosWithAuth'

const Employees = (props) => {
    const [data, setData] = useState([])
    const [error, setError] = useState('')

    const token = localStorage.getItem('token')
    console.log(token)
    useEffect(() => {
        const url = 'http://localhost:5001/employees' 
        axiosWithAuth()
            .get(url)
            .then(response => {
                console.log(response.data)
                setData(response.data)
            })
            .catch(error => {
                setError(error)
            })

    }, [])

    return ( 
        <div>
            <h1>Employees</h1>
            
            <p>{data.map((x,i) => {
                return <div key={i}>
                    <p>{x.username}</p>
                    <p>{x.role}</p>
                </div>
            })}</p>
        </div>
     );
}
 
export default Employees;
import React, {useEffect, useState} from 'react';
import axios from 'axios'
import {axiosWithAuth} from './axiosWithAuth'
import { Card, Form, Button } from 'semantic-ui-react'

const Employees = (props) => {
    const [data, setData] = useState([])
    const [error, setError] = useState('')
    const [input, setInput] = useState({
        form: {
            password: ''
        }
    })

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

    const handleChanges = (e) => {
        setInput({
            form: {
                ...input.form,
                [e.target.name]: e.target.value
            }
        })
    }

    const allEmployees = (e) => {
        if (input.form.password === 'password123') {
            axios
            .post('http://localhost:5001/allemployees')
            .then(response => {
                console.log(response.data)
                setData(response.data)
            })
            .catch(error => {
                setError(error)
            })
            setInput({
                form: {
                    password: ''
                }
            })
        } else {
            return <p>Please enter correct password</p>
        }
        
    }

    return ( 
        <div>
            <h1>Employees</h1>
            <div className="outer-employees">
            <p>{data.map((x,i) => {
                return <div key={i} className="employees">
                    <Card>
                        <Card.Content>
                            <Card.Header><p>Username: {x.username}</p></Card.Header>
                            <Card.Description><p>Role: {x.role}</p></Card.Description>
                        </Card.Content>
                        
                    </Card>
                    
                </div>
            })}</p>
            <div className="secret">
            <h3>If you want to see list of all employees, enter the secret password!</h3>
            <Form>
                <Form.Field>
                    <input 
                        placeholder="password" 
                        type="password"
                        name="password"
                        value={input.form.password}
                        onChange={handleChanges}
                    />
                </Form.Field>
                <Button onClick={allEmployees}>Submit</Button>
            </Form>
            </div>
            </div>
        </div>
     );
}
 
export default Employees;
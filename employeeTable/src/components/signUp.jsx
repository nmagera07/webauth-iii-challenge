import React, {useState, useEffect} from 'react';
import axios from 'axios'
import { Form, Button } from 'semantic-ui-react'

const SignUp = (props) => {
    const [input, setInput] = useState({
        form: {
            username: '',
            password: '',
            role: '',

        }
    })

    const [toggle, setToggle] = useState(false)

    const toggleState = () => {
        setToggle(!toggle)
    }

    const handleChanges = (e) => {
        setInput({
            form: {
                ...input.form,
                [e.target.name]: e.target.value
            }
        })
    }

    const loginUser = () => {
        axios
            .post('http://localhost:5001/login', {
                username: input.form.username,
                password: input.form.password
            })
            .then(response => {
                console.log(response)
                localStorage.setItem('token', response.data.token)
                props.history.push('/employees')
            })
            .catch(error => {
                console.log(error)
            })
    }

    const registerUser = () => {
        const newUser = {
            username: input.form.username,
            password: input.form.password,
            role: input.form.role
        }
        axios
            .post('http://localhost:5001/register', newUser)
            .then(response => {
                localStorage.setItem('token', response.data.token)
                props.history.push('/employees')
            })
            .catch(error => {
                console.log(error)
            })
    }


    if (!toggle) {
        return ( 
        <div className="login-form">
             <div className="Login" >
                <a href="#" style={{ textDecoration: "underline" }}>
                Login
                </a>
                <a href="#" onClick={toggleState}>
                Register
                </a>
                </div>
            
            <Form>
                <Form.Field>
                    <input 
                        placeholder="username" 
                        type="text"
                        name="username"
                        value={input.form.username}
                        onChange={handleChanges}
                    />
                </Form.Field>
                <Form.Field>
                    <input 
                        placeholder="password" 
                        type="password"
                        name="password"
                        value={input.form.password}
                        onChange={handleChanges}
                    />
                </Form.Field>
            <Button onClick={loginUser}>Login</Button>

            </Form>
        </div>
        
     )
    } else {
        return ( 
        <div className="login-form">
           <div className="Login">
          <a href="#" onClick={toggleState}>
            Login
          </a>
          <a href="#" style={{ textDecoration: "underline" }}>
            Register
          </a>
        </div>
            <Form>
                <Form.Field>
                    <input 
                        placeholder="username" 
                        type="text"
                        name="username"
                        value={input.form.username}
                        onChange={handleChanges}
                    />
                </Form.Field>
                <Form.Field>
                    <input 
                        placeholder="password" 
                        type="password"
                        name="password"
                        value={input.form.password}
                        onChange={handleChanges}
                    />
                </Form.Field>
                <Form.Field>
                    <input 
                        placeholder="role" 
                        type="text"
                        name="role"
                        value={input.form.role}
                        onChange={handleChanges}
                    />
                </Form.Field>
            <Button onClick={registerUser}>Register</Button>

            </Form>
        </div>
     )
    }
    
}
 
export default SignUp;
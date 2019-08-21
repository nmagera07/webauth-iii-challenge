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

    return ( 
        <div>
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
     );
}
 
export default SignUp;
import React, { useRef, useState } from 'react'
import { Card, Form, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'
import CenteredContainer from '../CenteredContainer'
import {Spinner} from 'react-bootstrap'
const Login = () => {
    const emailRef = useRef()
    const passwordRef = useRef()
    const { login } = useAuth()
    const [Error, setError] = useState('')
    const [Loading, setLoading] = useState(false)
    const history = useHistory()
    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setError('')
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            setLoading(false)
            history.push('/')
        } catch {
            setError('Failed to login')
            setLoading(false)
        }
    }
    return (
        <CenteredContainer>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Log In</h2>
                    {Error && <Alert variant='danger'className='text-center'>{Error}</Alert>}
                    {/* {currentUser.email} */}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email" className='mb-2'>
                            <Form.Label >Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required></Form.Control>
                        </Form.Group>
                        <Form.Group id="password" className='mb-2'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required></Form.Control>
                        </Form.Group>
                        <Button disabled={Loading} className="w-100 " type="submit">{Loading ? <Spinner animation="border" /> : 'Log In'}</Button>
                    </Form>
                    <div className="w-100 text-center mt-2"><Link to='/forgot-password'>Forgot Password?</Link></div>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">Need an Account? <Link to='/signup'>Sign Up</Link></div>
        </CenteredContainer>
    )
}

export default Login

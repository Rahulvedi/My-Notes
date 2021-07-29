import React, { useRef, useState } from 'react'
import { Card, Form, Button, Alert,Spinner } from 'react-bootstrap'
import { useAuth } from '../../contexts/AuthContext'
import { Link } from 'react-router-dom'
import CenteredContainer from '../CenteredContainer'

function ForgotPassword() {
    const emailRef = useRef()
    const { resetPassword } = useAuth()
    const [Error, setError] = useState('')
    const [Loading, setLoading] = useState(false)
    const [Message, setMessage] = useState('')
    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setError('')
            setMessage('')
            setLoading(true)
            await resetPassword(emailRef.current.value)
            setMessage('Check Email for Futher Instructions')
           
        } catch {
            setError('Failed To Reset Password')
        }
        setLoading(false)
    }
    return (
        <CenteredContainer>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Reset Password</h2>
                    {Error && <Alert variant='danger' className='text-center'>{Error}</Alert>}
                    {Message && <Alert variant='success'className='text-center'>{Message}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email" className='mb-2'>
                            <Form.Label >Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required></Form.Control>
                        </Form.Group>
                        <Button disabled={Loading} className="w-100 " type="submit">{Loading ? <Spinner animation="border" /> : 'Reset'}</Button>
                    </Form>
                    <div className="w-100 text-center mt-2"><Link to='/login'>Log In</Link></div>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">Need an Account? <Link to='/signup'>Sign Up</Link></div>
        </CenteredContainer>
    )
}

export default ForgotPassword
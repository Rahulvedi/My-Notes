import React,{useRef,useState} from 'react'
import { Card, Form, Button,Alert,Spinner } from 'react-bootstrap'
import {useAuth} from '../../contexts/AuthContext'
import {Link,useHistory} from 'react-router-dom'
import CenteredContainer from '../CenteredContainer'

function SignUp() {
    const emailRef=useRef()
    const passwordRef=useRef()
    const passwordConfirmRef=useRef()
    const {signup}=useAuth()
    const [Error, setError] = useState('')
    const [Loading, setLoading] = useState(false)
    const history=useHistory()
    async function handleSubmit(e){
        e.preventDefault()
        if(passwordRef.current.value!==passwordConfirmRef.current.value){
            return setError('Password do not match')
        }
        try{
            setError('')
            setLoading(true)
            await  signup(emailRef.current.value,passwordRef.current.value)
            history.push('/')
        }catch{
            setError('Failed to crete an account')
        }
        setLoading(false)
    }
    return (
        <CenteredContainer>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Sign Up</h2>
                    {Error && <Alert variant='danger'className='text-center'>{Error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email" className='mb-2'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef}required></Form.Control>
                        </Form.Group>
                        <Form.Group id="password" className='mb-2'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required></Form.Control>
                        </Form.Group>
                        <Form.Group id="password-confirm" className='mb-2'>
                            <Form.Label>Password Confirmation</Form.Label>
                            <Form.Control type="password" ref={passwordConfirmRef} required></Form.Control>
                        </Form.Group>
                        <Button disabled={Loading} className="w-100 "  type="submit">{Loading ? <Spinner animation="border" /> : 'Sign Up'}</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">Already have an Account? <Link to='/login'>Log In</Link></div>
        </CenteredContainer>
    )
}

export default SignUp


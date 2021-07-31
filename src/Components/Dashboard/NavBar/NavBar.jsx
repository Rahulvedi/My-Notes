import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {useAuth} from '../../../contexts/AuthContext'
import { Form, FormControl, Button } from 'react-bootstrap'
import { FaTimes, FaBars } from 'react-icons/fa'
const NavBar = ({handleSearch}) => {
    const [Click, setClick] = useState(false)
    let handleClick = (e) => {
        setClick(!Click)
    }
    function handleChange(e){
       handleSearch(e.target.value)
    }
    const {logout}=useAuth()
    async function handleLogout(e){
           await  logout()
    }
    return (
        <>
        <div className="NavBarOuterContainer">
            <div className="NavBarInnerContainer">
                <Link className='NavLogo' to='/'>My Notes</Link>
                <div className="mobileMenu">
                    {Click ? <FaTimes onClick={handleClick} /> : <FaBars onClick={handleClick} />}
                </div>
                <Form className="NavMenu">
                    <FormControl
                        type="search"
                        placeholder="Search"
                        className="mr-2"
                        aria-label="Search"
                        onChange={handleChange}
                    />
                    <Button variant="success" className='logoutBtn mx-2'  onClick={handleLogout}>LogOut</Button>
                </Form>
            </div>
        </div>

        </>
    )
}

export default NavBar

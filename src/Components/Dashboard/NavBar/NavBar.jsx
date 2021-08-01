import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {useAuth} from '../../../contexts/AuthContext'
import {  FormControl, Button } from 'react-bootstrap'
import { FaTimes, FaBars } from 'react-icons/fa'
const NavBar = ({handleSearch}) => {
    // let navStyle={
    //     background-color: #1B9CFC;
    //     top: -8rem;
    // }
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
                <div className={Click?'NavMenu navMenuOpen':'NavMenu'} style={{backgroundColor:'#1B9CFC'}}  >
                    <FormControl
                        className='NavMenu_search'
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                        onChange={handleChange}
                    />
                    <Button variant="success" className='logoutBtn'  onClick={handleLogout}>LogOut</Button>
                </div>
            </div>
        </div>

        </>
    )
}

export default NavBar

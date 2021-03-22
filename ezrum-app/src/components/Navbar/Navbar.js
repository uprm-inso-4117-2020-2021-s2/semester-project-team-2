import React from 'react'
import Navlink from '../../components/Navbar/Navlink'
import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap'
import EzrumLogo from '../../assets/ezrum_logo_black.png'
// import { ReactComponent as EzrumLogo } from '../../assets/ezrum_logo.svg'



function NabvarView() {
  return (
    <Navbar>
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto ml-5">
          <Navlink path='/'>
            <img className='nav__logo' src={EzrumLogo} width={228 - 60} height={123 - 60} alt='EZRUM Logo' />
          </Navlink>
        </Nav>
        <Nav className='mr-5'>
          {/* <Navlink path="/scheduling">Scheduling</Navlink> */}
          <Navlink path='/signup'>
            <Button variant='secondary'>Find Tutor</Button>
          </Navlink>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NabvarView

import React from 'react'
import './Navbar.css'
import Navlink from '../../components/Navbar/Navlink'
import { Navbar, Nav, Button, Image } from 'react-bootstrap'
import EzrumLogo from '../../assets/ezrum_logo_white.png'
import { navbarHeight } from '../../util/Util'
import { useStateValue } from '../../context/Provider'
import { useHistory } from "react-router-dom";
import DefaultAvatar from '../../assets/default-avatar.png'


function NabvarView() {
  const { authState, tutorState } = useStateValue();

  return (
    <Navbar style={{ height: navbarHeight }}>
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto ml-5">
          <Navlink path='/'>
            <img className='nav__logo' src={EzrumLogo} width={228 - 60} height={123 - 60} alt='EZRUM Logo' />
          </Navlink>
        </Nav>
        <Nav className='mr-5'>
          {
            (authState.user && tutorState.subjects)
              ?
              <div className='d-flex align-items-center'>
                <div>
                  <Navlink path='/tutor/schedule'>
                    Schedule
                  </Navlink>
                </div>
                <div className='ml-5'>
                  <Navlink path='/tutor/requests'>
                    Requests
                  </Navlink>
                </div>
                <div className='ml-5'>
                  <Navlink path='/tutor/subjects'>
                    <Image
                      height='40' width='40'
                      src={DefaultAvatar} roundedCircle
                    />
                  </Navlink>
                </div>
              </div>
              :
              <Navlink path='/signup/tutoree'>
                <Button variant='secondary'>
                  Find Tutor
                </Button>
              </Navlink>
          }
        </Nav>
      </Navbar.Collapse>
    </Navbar >
  )
}

export default NabvarView

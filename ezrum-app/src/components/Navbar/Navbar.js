import React from 'react'
import './Navbar.css'
import Navlink from '../../components/Navbar/Navlink'
import { Navbar, Nav, Button } from 'react-bootstrap'
import EzrumLogo from '../../assets/ezrum_logo_white.png'
import { navbarHeight } from '../../util/Util'
import { useStateValue } from '../../context/Provider'
// import { useHistory } from "react-router-dom";
// import DefaultAvatar from '../../assets/default-avatar.png'


function NabvarView() {
  const { authState, tutorState } = useStateValue();
  console.log('NabvarView', authState)

  const handleView = () => {
    if (authState.email && authState.tutor_id) {
      return (
        <div className='d-flex align-items-center pb-2'>
          {/* <div>
                  <Navlink path='/tutor/schedule'>
                    Schedule
                  </Navlink>
                </div> */}
          <div className='ml-5'>
            <Navlink path='/tutor/subjects'>
              My Subjects
            </Navlink>
          </div>
          {/* <div className='ml-5'>
                  <Navlink path='/tutor/subjects'>
                    <Image
                      height='40' width='40'
                      src={DefaultAvatar} roundedCircle
                    />
                  </Navlink>
                </div> */}
        </div>
      )
    }
    else if (authState.email && authState.tutoree_id) {
      return (
        <div className='d-flex align-items-center pb-2'>
          <div className='ml-5'>
            <Navlink path='/tutor/find-tutor'>
              Find Tutor
            </Navlink>
          </div>
        </div>
      )
    }
    else {
      return (
        <Navlink path='/signup/tutoree'>
          <Button variant='secondary'>
            Find Tutor
          </Button>
        </Navlink>
      )
    }
  }

  console.log('navbar', authState, tutorState)
  return (
    <Navbar style={{ height: navbarHeight }}>
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto ml-5">
          <Navlink path='/'>
            <img className='nav__logo' src={EzrumLogo} width={228 - 60} height={123 - 60} alt='EZRUM Logo' />
          </Navlink>
        </Nav>
        <Nav className='mr-5'>
          {handleView()}
        </Nav>
      </Navbar.Collapse>
    </Navbar >
  )
}

export default NabvarView




// {
//   // (authState.email && (tutorState.subjects?.length > 0))
//   (authState.email && (authState.tutor_id || authState.tutoree_id))
//     ?
//     <div className='d-flex align-items-center pb-2'>
//       {/* <div>
//         <Navlink path='/tutor/schedule'>
//           Schedule
//         </Navlink>
//       </div> */}
//       <div className='ml-5'>
//         <Navlink path='/tutor/subjects'>
//           My Subjects
//         </Navlink>
//       </div>
//       {/* <div className='ml-5'>
//         <Navlink path='/tutor/subjects'>
//           <Image
//             height='40' width='40'
//             src={DefaultAvatar} roundedCircle
//           />
//         </Navlink>
//       </div> */}
//     </div>
//     :
//     <div className='d-flex align-items-center pb-2'>
//       <div>
//         <Navlink path='/tutoree/find-tutor'>
//           <Button variant='secondary'>
//             Find Tutor
//           </Button>
//         </Navlink>
//       </div>
//     </div>
// }
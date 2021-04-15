import React, { useState } from 'react'
import './Signup.css'
import Navlink from '../../../components/Navbar/Navlink'
import { Card, Form, Button } from 'react-bootstrap'


function Signup({ userType }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleEmailChange = e => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = e => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = e => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password)
  }

  const displayHeader = () => {

  }

  return (
    <div className='signup'>
      <div className='signup__centering'>
        <Card className='p-4'>
          <h3>
            {userType === 'tutor' ? 'Ready to Become a Tutor' : 'Ready to Learn From Experts'}
          </h3>
          <hr className='w-50' style={{ margin: '10px auto 20px auto' }} />
          <Form onSubmit={handleSubmit}>
            <Form.Group
              controlId='formBasicEmail'
              onChange={handleEmailChange}
            >
              <Form.Control type='email' placeholder='Email' />
            </Form.Group>
            <Form.Group
              controlId='formBasicPassword'
              onChange={handlePasswordChange}
            >
              <Form.Control type='password' placeholder='Password' />
            </Form.Group>
            <Form.Group
              controlId='formBasicPassword'
              onChange={handleConfirmPasswordChange}
            >
              <Form.Control type='password' placeholder='Confirm Password' />
            </Form.Group>
            <Navlink path='/signup/add-subject'>
              {
                userType === 'tutor'
                  ?
                  <Button
                    variant='light'
                    type='submit'
                    className='w-100 green'
                  >
                    <span className='green h5'>Continue</span>
                  </Button>
                  :
                  <div className='d-flex justify-content-center align-content-center'>
                    <div className='w-100 mr-2'>
                      <Navlink path={`/`}>
                        <Button variant='light' type='submit' className='w-100'>
                          <span className='green'>Cancel</span>
                        </Button>
                      </Navlink>
                    </div>
                    <div className='w-100'>
                      <Navlink path={`/tutoree/find-tutor`}>
                        <Button variant='primary' type='submit' className='w-100'>
                          Sign Up
                        </Button>
                      </Navlink>
                    </div>
                  </div>
              }
            </Navlink>
          </Form>
        </Card>
      </div>
    </div>
  )
}

export default Signup

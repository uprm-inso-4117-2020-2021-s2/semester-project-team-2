import React, { useState } from 'react'
import './Signup.css'
import Navbar from '../../components/Navbar/Navbar'
import Navlink from '../../components/Navbar/Navlink'
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
            <Button
              variant='primary'
              type='submit'
              className='w-100'
            >
              Submit
            </Button>
          </Form>
        </Card>
      </div>
    </div>
  )
}

export default Signup

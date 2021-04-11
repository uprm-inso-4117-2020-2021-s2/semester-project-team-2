import React, { useState } from 'react'
import './Signin.css'
import { Card, Form, Button } from 'react-bootstrap'


function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = e => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = e => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password)
  }

  return (
    <div className='signin'>
      <div className='signin__centering'>
        <Card className='p-4'>
          <h3>
            Sign In
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

export default Signin

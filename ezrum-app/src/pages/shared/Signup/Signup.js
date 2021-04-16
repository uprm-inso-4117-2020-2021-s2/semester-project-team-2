import React, { useState } from 'react'
import './Signup.css'
import Navlink from '../../../components/Navbar/Navlink'
import { Card, Form, Button } from 'react-bootstrap'
import { useStateValue } from '../../../context/Provider'
import { useHistory } from "react-router-dom"

function Signup({ userType }) {
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [confirmPassword, setConfirmPassword] = useState('')
  const [email, setEmail] = useState('kevin.ramirez3@upr.edu');
  const [password, setPassword] = useState('Bestlife!8');
  const [confirmPassword, setConfirmPassword] = useState('Bestlife!8')
  const { authState, authDispatch } = useStateValue();

  console.log('auth, ...', authState)
  // const context = useStateValue()
  // console.log(context)

  const history = useHistory();
  if (authState.user) {
    history.push(authState.userType === 'tutor' ? '/tutor/add-subject' : '/tutoree/find-tutor')
  }
  else {
    console.log('user not signed in')
  }

  const handleEmailChange = e => {
    console.log(e.target.value);
    setEmail(e.target.value);
  };

  const handlePasswordChange = e => {
    console.log(e.target.value);
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = e => {
    console.log(e.target.value);
    setConfirmPassword(e.target.value);
  };

  const tutorContinue = (e) => {
    e.preventDefault();
    setEmail('kevin.ramirez3@upr.edu');
    setPassword('Bestlife!8');
    setConfirmPassword('Bestlife!8');
    // console.log('-', email, password, confirmPassword)
    const user = {
      email: email,
      password: password
    }
    // context.authDispatch({
    authDispatch({
      type: 'SET_USER',
      user: user,
      // userType: 'tutor'
    })
    history.push('/signup/add-subject')
  }

  const tutoreeCancel = (e) => {
    e.preventDefault();
    console.log('onCancel')
    history.goBack()
  }

  const tutoreeSignup = (e) => {
    e.preventDefault();
    console.log('onContinue')
    history.goBack()
  }


  return (
    <div className='signup'>
      <div className='signup__centering'>
        <Card className='p-4'>
          <h3>
            {userType === 'tutor' ? 'Ready to Become a Tutor' : 'Ready to Learn From Experts'}
          </h3>
          <hr className='w-50' style={{ margin: '10px auto 20px auto' }} />
          <Form>
            <Form.Group
              controlId='email'
              onChange={handleEmailChange}
            >
              <Form.Control type='email' placeholder='Email' />
            </Form.Group>
            <Form.Group
              controlId='password'
              onChange={handlePasswordChange}
            >
              <Form.Control type='password' placeholder='Password' />
            </Form.Group>
            <Form.Group
              controlId='confirmPassword'
              onChange={handleConfirmPasswordChange}
            >
              <Form.Control type='password' placeholder='Confirm Password' />
            </Form.Group>
            {
              !authState.user
                ?
                <Button
                  variant='light'
                  type='submit'
                  className='w-100 green'
                  onClick={tutorContinue}
                >
                  <span className='green h5'>Continue</span>
                </Button>
                :
                <div className='d-flex justify-content-center align-content-center'>
                  <div className='w-100 mr-2'>
                    <Button variant='light' type='submit' className='w-100' onClick={tutoreeCancel}>
                      <span className='green'>Cancel</span>
                    </Button>
                  </div>
                  <div className='w-100'>
                    <Button variant='primary' type='submit' className='w-100' onClick={tutoreeSignup}>
                      Sign Up
                    </Button>
                  </div>
                </div>
            }
          </Form>
        </Card>
      </div>
    </div>
  )
}

export default Signup

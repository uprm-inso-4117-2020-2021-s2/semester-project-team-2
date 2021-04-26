import React, { useState } from 'react'
import './Signin.css'
import { Card, Form, Button } from 'react-bootstrap'
import { useStateValue } from '../../../context/Provider'
import { useHistory } from 'react-router-dom'

function Signin() {
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [email, setEmail] = useState('juana.diaz@upr.edu');
  // const [password, setPassword] = useState('ezrum!9');
  const [email, setEmail] = useState('kevin.ramirez3@upr.edu');
  const [password, setPassword] = useState('ezrum!1');
  const [errorText, setErrorText] = useState('')

  const { authDispatch } = useStateValue();
  const history = useHistory();

  const handleEmailChange = e => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = e => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password)

    const authData = {
      email: email,
      password: password,
    };

    await fetch(`http://localhost:5000/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(authData)
    })
      .then(res => res.json())
      .then(user => {
        if (user.message) {
          console.log('tf user', user)
          if (user.message.includes('email'))
            setErrorText('Email does not exist')
          else if (user.message.includes('password'))
            setErrorText('Incorrect password')
          console.log('errorText', errorText)
          history.push('/signin')
        }
        else {
          console.log('user signed in successfully', user)
          authDispatch({
            type: 'SET_USER',
            ...user
          })
          history.push((user.user_type === 'tutor') ? '/tutor/subjects' : '/tutoree/find-tutor')
        }
      })
      .catch(err => {
        console.log('err', err)
      });
  }

  // const AlertDismissible = () => {
  //   const [show, setShow] = useState(true);
  //   console.log('AlertDismissible', errorText)

  //   // const close = () => {
  //   //   setShow(false)
  //   // }

  //   if (show) {
  //     if (errorText.includes('Password')) {
  //       console.log('FUCK')
  //       return (
  //         { errorText }

  //         // <Alert variant="danger" onClose={close()} dismissible>
  //         //   {errorText}
  //         // </Alert>
  //       )
  //     }
  //     if (errorText.includes('Email')) {
  //       console.log('FUCK')
  //       return (
  //         { errorText }
  //         // <Alert variant="danger" onClose={close()} dismissible>
  //         //   {errorText}
  //         // </Alert>
  //       )
  //     }
  //   }
  //   return null;
  // }

  return (
    <div className='signin'>
      <div className='signin__centering'>
        <Card className='p-4'>
          <h3 className='text-center'>Sign In</h3>
          <hr className='w-50' style={{ margin: '10px auto 20px auto' }} />
          <Form onSubmit={handleSubmit}>
            {/* <AlertDismissible /> */}
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

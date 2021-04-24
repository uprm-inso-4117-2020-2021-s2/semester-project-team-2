import React, { Suspense, useState } from 'react'
import './Signup.css'
import Navlink from '../../../components/Navbar/Navlink'
import { Card, Form, Button } from 'react-bootstrap'
import { useStateValue } from '../../../context/Provider'
import { useRouteMatch, useHistory } from "react-router-dom"
import AddSubject from '../../tutor/AddSubject/AddSubject'
import { urlSlug, randomStr } from '../../../util/Util'
import { tutorViews } from '../../../util/ContentViews'

function Signup() {
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [confirmPassword, setConfirmPassword] = useState('')
  const [firstName, setFirstName] = useState('Antonny');
  const [lastName, setLastName] = useState('Pagan');
  const [email, setEmail] = useState(randomStr() + '@yahoo.com');
  const [password, setPassword] = useState('ezrum!2');
  const [confirmPassword, setConfirmPassword] = useState('ezrum!2')
  const { tutorState, authState, authDispatch } = useStateValue();

  console.log('randomStr', randomStr())
  console.log('----tutorState', tutorState)

  let { url } = useRouteMatch();
  const history = useHistory();

  const handleFirstNameChange = e => {
    console.log(e.target.value);
    setFirstName(e.target.value);
  };

  const handleLastNameChange = e => {
    console.log(e.target.value);
    setLastName(e.target.value);
  };

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
    // setEmail('kevin.ramirez3@upr.edu');
    // setPassword('Bestlife!8');
    // setConfirmPassword('Bestlife!8');
    // console.log('-', email, password, confirmPassword)
    const user = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password,
      user_type: 'tutor'
    }
    console.log('tutorContinue', user)
    authDispatch({
      type: 'SET_USER',
      ...user
    })
  }

  const tutoreeCancel = (e) => {
    e.preventDefault();
    history.goBack()
  }

  const tutoreeSignup = (e) => {
    e.preventDefault();
    console.log('tutoreeSignup')
  }

  const handleSignup = async () => {
    const authData = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password,
      user_type: 'tutor'
      // first_name: 'Kevin',
      // last_name: 'Ramirez',
      // email: randomStr() + '@yahoo.com',
      // password: 'postfinallyworked',
      // user_type: 'tutor'
    };

    // const options = {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(authData)
    // }
    // // const res = await useFetch('/users', options, undefined, true, undefined);
    // // console.log(res)


    await fetch(`http://localhost:5000/api/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(authData)
    })
      .then(res => res.json())
      .then(user => {
        console.log('user', user)
        authDispatch({
          type: 'SET_USER_ID',
          user_id: user.user_id,
          tutor_id: user.tutor_id,
        })
        console.log('authState', authState)
      })
      .catch(err => console.log(err));
  }

  // const [resource, setResource] = useState(initialResource)

  const handleTutor = () => {
    console.log('authState', authState)
    console.log('tutorState', tutorState)

    if (authState.email && tutorState.subjects?.length > 0) {
      console.log('Warning: Cannot update during an existing state transition ...')
      history.push('/tutor/subjects')
      // console.log('=-=-=--', authState.user_id)
      // return (
      //   <Suspense fallback={<div>LOADING ...</div>}>
      //     {/* {redirectTutor(resource)} */}
      //     <Subjectss resource={resource} />
      //   </Suspense>
      // )
      // history.push(`/tutor/subjects/${}`)
    }
    else if (authState.email) {
      console.log('AddSubject')
      return (
        <AddSubject handleSignup={handleSignup} />
      )
    } else {
      console.log('else')
      return cardComponent()
    }
  }

  const handleTutoree = () => {
    if (authState.user) {
      history.push('/tutoree/find-tutor')
    }
  }

  const cardComponent = () => {
    return (
      <Card className='p-4'>
        <h3>
          {urlSlug(url) === 'tutor' ? 'Ready to Become a Tutor' : 'Ready to Learn From Experts'}
        </h3>
        <hr className='w-50' style={{ margin: '10px auto 20px auto' }} />
        <Form>
          <Form.Group
            controlId='firstName'
            onChange={handleFirstNameChange}
          >
            <Form.Control type='text' placeholder='First Name' />
          </Form.Group>
          <Form.Group
            controlId='lastName'
            onChange={handleLastNameChange}
          >
            <Form.Control type='text' placeholder='Last Name' />
          </Form.Group>
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
            urlSlug(url) === 'tutor'
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
    )
  }

  return (
    <div className='signup'>
      <div className='signup__centering'>
        {
          urlSlug(url) === 'tutor'
            ? handleTutor()
            : handleTutoree()
        }
      </div>
    </div>
  )
}

export default Signup

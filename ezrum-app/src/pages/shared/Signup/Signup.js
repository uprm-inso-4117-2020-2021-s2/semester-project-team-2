import React, { useState } from 'react'
import './Signup.css'
// import Navlink from '../../../components/Navbar/Navlink'
import { Card, Form, Button, Alert } from 'react-bootstrap'
import { useStateValue } from '../../../context/Provider'
import { useRouteMatch, useHistory } from "react-router-dom"
import AddSubject from '../../tutor/AddSubject/AddSubject'
import { urlSlug, randomStr } from '../../../util/Util'
// import { tutorViews } from '../../../util/ContentViews'

function Signup() {
  // const [firstName, setFirstName] = useState('');
  // const [lastName, setLastName] = useState('');
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [confirmPassword, setConfirmPassword] = useState('')

  /**************** HARDCODED FOR TESTING PURPOSES ****************/
  const [firstName, setFirstName] = useState('Antonny');
  const [lastName, setLastName] = useState('Pagan');
  // const [email, setEmail] = useState('kevin.ramirez3@upr.edu');
  const [email, setEmail] = useState(randomStr() + '@yahoo.com');
  const [password, setPassword] = useState('ezrum!1');
  const [confirmPassword, setConfirmPassword] = useState('ezrum!2')
  const [errorText, setErrorText] = useState('')
  const { tutorState, tutorDispatch, authState, authDispatch } = useStateValue();
  /****************************************************************/


  // console.log('randomStr', randomStr())
  // console.log('----tutorState', tutorState)

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

  const tutoreeSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorText('Passwords does not match')
      console.log('passwords don\'t match')
    }
    const authData = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password,
      user_type: 'tutoree'
    };
    await fetch(`http://localhost:5000/api/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(authData)
    })
      .then(res => res.json())
      .then(user => {
        console.log('posted user', user)
        authDispatch({
          type: 'SET_USER',
          ...user
        });
        console.log('ahhhh push it');
        history.push('/tutoree/find-tutor');
      })
      .catch(err => {
        setErrorText('Email already exists')
        console.log('errorText', errorText)
        console.log('err', err)
      });
  }

  const handleSignup = async (subjectObj) => {
    if (password !== confirmPassword) {
      setErrorText('Passwords does not match')
      console.log('passwords don\'t match')
    }
    const authData = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password,
      user_type: 'tutor'
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
        console.log('posted user', user)
        authDispatch({
          type: 'SET_USER_ID',
          user_id: user.user_id,
          tutor_id: user.tutor_id,
        })
        if (subjectObj) {
          console.log('subjectObj', subjectObj)
          tutorDispatch({
            type: 'ADD_SUBJECT',
            subject: subjectObj,
            tutor_id: null
          })
        }
        history.push('/tutor/subjects')
      })
      .catch(err => {
        setErrorText('Email already exists')
        console.log('errorText', errorText)
        console.log('err', err)
      });
  }



  const handleTutor = () => {
    console.log('authState', authState)
    console.log('tutorState', tutorState)

    // if (authState.email && tutorState.subjects?.length > 0) {
    //   console.log('Warning: Cannot update during an existing state transition ...')
    //   history.push('/tutor/subjects')
    //   // history.push(`/tutor/subjects/${}`)
    // }
    // else 

    if (authState.email) {
      console.log('AddSubject')
      return (
        <AddSubject handleSignup={handleSignup} errorText={errorText} AlertDismissible={AlertDismissible} />
      )
    } else {
      return cardComponent()
    }
  }

  const handleTutoree = () => {
    console.log(authState)
    if (authState.tutoree_id) {
      history.push('/tutoree/find-tutor')
    }
    else {
      console.log('else')
      return cardComponent()
    }
  }

  const AlertDismissible = () => {
    const [show, setShow] = useState(true);
    console.log('AlertDismissible', errorText)

    const close = () => {
      setShow(false)
    }

    if (show) {
      if (errorText.includes('Password')) {
        console.log(errorText);
        return (
          // { errorText }
          <Alert Alert variant="danger" onClose={close()} dismissible >
            { errorText}
          </Alert >
        )
      }
      if (errorText.includes('Email')) {
        return (
          // { errorText }

          <Alert variant="danger" onClose={close()} dismissible>
            {errorText}
          </Alert>
        )
      }
    }
    return null;
  }

  const cardComponent = () => {
    console.log('errorText', errorText)
    return (
      <Card className='p-4'>
        <h3 className='text-center'>
          {urlSlug(url) === 'tutor' ? 'Ready to Become a Tutor' : 'Ready to Learn From Experts'}
        </h3>
        <hr className='w-50' style={{ margin: '10px auto 20px auto' }} />
        <Form>
          <AlertDismissible />

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

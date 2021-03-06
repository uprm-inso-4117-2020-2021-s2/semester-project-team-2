import React, { useState } from 'react'
import './AddSubject.css'
// import Navlink from '../../../components/Navbar/Navlink'
import { Card, Form, Button } from 'react-bootstrap'
import { useStateValue } from '../../../context/Provider'
// import { useHistory } from "react-router-dom";


function AddSubject({ handleSignup, errorText, AlertDismissible }) {
  // const [subject, setSubject] = useState('');
  // const [price, setPrice] = useState('');
  // const [description, setDescription] = useState('');
  const [subject, setSubject] = useState('Calculus 1');
  const [price, setPrice] = useState(20);
  const [description, setDescription] = useState('DESCRIPTION');
  const { authDispatch, tutorState } = useStateValue();
  console.log(errorText)

  const handleSubjectChange = e => {
    setSubject(e.target.value);
  };

  const handlePriceChange = e => {
    setPrice(e.target.value);
  };

  const handleDescriptionChange = e => {
    setDescription(e.target.value);
  };

  const onCancel = e => {
    e.preventDefault()
    authDispatch({ type: 'REMOVE_USER' })
  }


  const onSignup = e => addSubject(e)
  const addSubject = e => {
    e.preventDefault();
    const subjectObj = {
      subject_name: subject,
      pricing_rate: 'hourly',
      price: price,
      description: description
    }

    if (handleSignup)
      handleSignup(subjectObj)
  }


  return (
    <div className='addSubject'>
      <div className='addSubject__centering'>
        <Card className='p-4'>
          <h4>Add Subject of Expertise</h4>
          <hr className='w-50' style={{ margin: '10px auto 20px auto' }} />
          <Form>
            <AlertDismissible />
            <Form.Group
              controlId='formBasicEmail'
              onChange={handleSubjectChange}
            >
              <Form.Control type='text' placeholder='Subjet of expertise' />
            </Form.Group>
            <Form.Group
              controlId='formBasicPassword'
              onChange={handlePriceChange}
            >
              <Form.Control type='number' placeholder='Price per hour' />
            </Form.Group>
            <Form.Group
              controlId='formBasicPassword'
              onChange={handleDescriptionChange}
            >
              <Form.Control as="textarea" rows={3} placeholder='Description' />
            </Form.Group>
            {
              !tutorState.subjects
                ?
                <div className='d-flex justify-content-center align-content-center'>
                  <div className='w-100 mr-2'>
                    <Button variant='light' type='submit' className='w-100' onClick={onCancel}>
                      <span className='green'>Cancel</span>
                    </Button>
                  </div>
                  <div className='w-100'>
                    <Button variant='primary' type='submit' className='w-100' onClick={onSignup}>
                      Sign Up
                    </Button>
                  </div>
                </div>
                :
                <Button
                  variant='primary'
                  type='submit'
                  className='w-100'
                  onClick={addSubject}
                >
                  <span className='h5'>Add Subject</span>
                </Button>
            }
          </Form>
        </Card>
      </div>
    </div>
  )
}

export default AddSubject
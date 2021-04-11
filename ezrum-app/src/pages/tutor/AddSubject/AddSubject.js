import React, { useState } from 'react'
import './AddSubject.css'
import Navlink from '../../../components/Navbar/Navlink'
import { Card, Form, Button } from 'react-bootstrap'
import Subjects from '../Subjects/Subjects'

function AddSubject() {
  const [subject, setSubject] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('')

  const handleSubjectChange = e => {
    setSubject(e.target.value);
  };

  const handlePriceChange = e => {
    setPrice(e.target.value);
  };

  const handleDescriptionChange = e => {
    setDescription(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  }


  return (
    <div className='addSubject'>
      <div className='addSubject__centering'>
        <Card className='p-4'>
          <h4>Add Subject of Expertise</h4>
          <hr className='w-50' style={{ margin: '10px auto 20px auto' }} />
          <Form onSubmit={handleSubmit}>
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
            <div className='d-flex justify-content-center align-content-center'>
              <div className='w-100 mr-2'>
                <Navlink path={`/signup`}>
                  <Button variant='light' type='submit' className='w-100'>
                    <span className='green'>Cancel</span>
                  </Button>
                </Navlink>
              </div>
              <div className='w-100'>
                <Navlink path={`/tutor/subjects`}>
                  <Button variant='primary' type='submit' className='w-100'>
                    Sign Up
                  </Button>
                </Navlink>
              </div>
            </div>
          </Form>
        </Card>
      </div>
    </div>
  )
}

export default AddSubject
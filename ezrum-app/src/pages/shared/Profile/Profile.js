import React from 'react'
import './Profile.css'
import { Form, Button, Image } from 'react-bootstrap'
import DefaultAvatar from '../../../assets/default-avatar.png'


function Profile() {
  const saveChanges = () => {

  }

  return (
    <div className='profile'>
      <h2>PROFILE</h2>
      <hr className='m-0' />
      <div className=''>
        <div className='d-flex justify-content-center'>
          <div className='mr-5'>
            <div className='text-center'>
              <Image
                height='92' width='92'
                src={DefaultAvatar} roundedCircle
                className='mb-3'
              />
            </div>
            <div>
              <Form>
                <Form.Group
                  controlId='other'
                // onChange={handleEmailChange}
                >
                  <Form.Control type='text' placeholder='First Name' />
                </Form.Group>
                <Form.Group
                  controlId='other3'
                // onChange={handlePasswordChange}
                >
                  <Form.Control type='text' placeholder='Last Name' />
                </Form.Group>
                <Form.Group
                  controlId='pricingRate'
                // onChange={handleConfirmPasswordChange}
                >
                  <Form.Control type='text' placeholder='Pricing Rate' />
                </Form.Group>
              </Form>
            </div>
          </div>
          <div className='ml-5'>
            <Form>
              <Form.Group
                controlId='firstName'
              // onChange={handleEmailChange}
              >
                <Form.Control type='text' placeholder='First Name' />
              </Form.Group>
              <Form.Group
                controlId='lastName'
              // onChange={handlePasswordChange}
              >
                <Form.Control type='text' placeholder='Last Name' />
              </Form.Group>
              <Form.Group
                controlId='workingHours'
              // onChange={handleEmailChange}
              >
                <Form.Control type='text' placeholder='Working Hours' />
              </Form.Group>
              <Form.Group
                controlId='university'
              // onChange={handlePasswordChange}
              >
                <Form.Control type='text' placeholder='University' />
              </Form.Group>
              <Form.Group
                controlId='language'
              // onChange={handleConfirmPasswordChange}
              >
                <Form.Control type='text' placeholder='Language' />
              </Form.Group>
            </Form>
          </div>
        </div>
        <div className='text-center mt-3'>
          <Button
            variant='primary'
            type='submit'
            className='w-25 green'
            onClick={saveChanges}
          >
            <span className='h5'>Save Changes</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Profile

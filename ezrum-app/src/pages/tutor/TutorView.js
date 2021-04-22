import React, { useState, useEffect } from 'react'
import './TutorView.css'
import Requests from '../../pages/tutor/Requests/Requests'
import Subjects from './Subjects/Subjects'
import Profile from '../../pages/shared/Profile/Profile'
import Schedule from '../../pages/shared/Schedule/Schedule'
import { useStateValue } from '../../context/Provider'
import { tutorViews } from '../../util/ContentViews'
import { urlSlug } from '../../util/Util'
import { useRouteMatch, useHistory } from "react-router-dom"
import axios from 'axios'

/** Handles the components to be displayed by recognizing route changes. */
function TutorView() {
  let { url } = useRouteMatch();
  const history = useHistory();
  const { authState, authDispatch, tutorDispatch } = useStateValue();
  const [email, setEmail] = useState(authState.email)

  useEffect(() => {
    console.log('tutorView useEffect', authState.email, email)
    const email = 'LtqDiJbjoS2@yahoo.com'
    // const urll = `http://localhost:5000/api/users/${email}`


    fetch(`http://localhost:5000/api/users/LtqDiJbjoS2@yahoo.com`, {
      // fetch(`http://localhost:5000/api/users/${authState.email}`, {
      // fetch(`http://localhost:5000/api/users/${email}`, {
      // fetch(`http://localhost:5000/api/users/${String(email)}`, {
      // fetch(`http://localhost:5000/api/users/${email}`, {
      // fetch(urll, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(res => res.json())
      .then(user => {
        console.log('PLEASE user', user)
        authDispatch({
          type: 'SET_USER_ID',
          user_id: user.user_id,
        })
        tutorDispatch({
          type: 'SET_TUTOR_ID',
          tutor_id: user.tutor_id
        })
        console.log('=-=- authState', authState)
      })
      .catch(err => console.log(err))

    //   axios.get(`http://localhost:5000/api/users/LtqDiJbjoS2@yahoo.com`)
    //     // axios.get(`http://localhost:5000/api/users/${authState.email}`)
    //     .then(function (response) {
    //       console.log(response)
    //       // console.log('PLEASE user', user)
    //       // authDispatch({
    //       //   type: 'SET_USER_ID',
    //       //   user_id: user.user_id,
    //       // })
    //       // tutorDispatch({
    //       //   type: 'SET_TUTOR_ID',
    //       //   tutor_id: user.tutor_id
    //       // })
    //       // console.log('=-=- authState', authState)
    //     })
    //     .catch(function (error) {
    //       // handle error
    //       console.log(error);
    //     })
  }, [])

  // useEffect(() => {
  //   console.log('authState CHANGED', authState.user_id)


  // }, [authState])


  // console.log(url, typeof (urlSlug(url)))

  // if (typeof (urlSlug(url)) === 'number') {

  // }


  /** returns the component to be displayed.
    * @param view the name of the component to be displayed
    */
  const handleView = (view) => {
    switch (view) {
      case tutorViews.subjects:
        return <Subjects />
      case tutorViews.requests:
        return <Requests />
      case tutorViews.profile:
        return <Profile />
      default:
        return <Schedule />
    }
  }

  const redirect = () => {
    console.log('really?', authState.user_id)
    history.push('/')
  }

  return (
    <div className='tutorView'>
      {
        authState.email
          ?
          handleView(urlSlug(url))
          :
          redirect()
      }
    </div>
  )
}

export default TutorView

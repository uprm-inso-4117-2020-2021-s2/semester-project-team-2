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

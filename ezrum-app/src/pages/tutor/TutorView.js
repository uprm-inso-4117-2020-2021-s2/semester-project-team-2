import React from 'react'
import { useRouteMatch } from 'react-router-dom'
import { tutorViews } from '../../util/ContentViews'
import { urlSlug } from '../../util/Util'
import Requests from '../../pages/tutor/Requests/Requests'
import Subjects from './Subjects/Subjects'
import Profile from '../../pages/shared/Profile/Profile'
import Schedule from '../../pages/shared/Schedule/Schedule'

/** Handles the components to be displayed by recognizing route changes. */
function TutorView() {
  let { url } = useRouteMatch();

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

  return (
    <div>
      {handleView(urlSlug(url))}
    </div>
  )
}

export default TutorView

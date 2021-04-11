import React, { useState } from 'react'
import { useRouteMatch } from 'react-router-dom'
import Navlink from '../../components/Navbar/Navlink'
import { Button } from 'react-bootstrap'
import { tutorViews } from '../../util/ContentViews'
import { domainUrl, urlSlug } from '../../util/Util'
import Requests from '../../pages/tutor/Requests/Requests'
import Subjects from './Subjects/Subjects'

/** Handles the components to be displayed by recognizing route changes. */
function TutorView() {
  const [view, setView] = useState(tutorViews.subjects);
  console.log(tutorViews)
  let { path } = useRouteMatch();
  let { url } = useRouteMatch();
  console.log('url', url)
  console.log('path', path)

  /** returns the component to be displayed.
    * @param view the name of the component to be displayed
    */
  const handleView = (view) => {
    switch (view) {
      case tutorViews.subjects:
        return <Subjects />
      case tutorViews.requests:
        return <Requests />
    }
  }

  return (
    <div>
      {handleView(urlSlug(url))}
    </div>
  )
}

export default TutorView

import React from 'react'
import { useRouteMatch } from 'react-router-dom'
import { tutoreeViews } from '../../util/ContentViews'
import { urlSlug } from '../../util/Util'
import FindTutor from '../../pages/tutoree/FindTutor/FindTutor'
import Profile from '../../pages/shared/Profile/Profile'
import Schedule from '../../pages/shared/Schedule/Schedule'

function TutoreeView() {
  let { url } = useRouteMatch();

  /** returns the component to be displayed.
    * @param view the name of the component to be displayed
    */
  const handleView = (view) => {
    switch (view) {
      case tutoreeViews.findTutor:
        return <FindTutor />
      case tutoreeViews.profile:
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

export default TutoreeView

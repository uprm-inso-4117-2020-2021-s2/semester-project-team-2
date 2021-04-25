import React from 'react'
import './TutoreeView.css'
import { useRouteMatch, useHistory } from 'react-router-dom'
import { useStateValue } from '../../context/Provider'
import { tutoreeViews } from '../../util/ContentViews'
import { urlSlug } from '../../util/Util'
import FindTutor from '../../pages/tutoree/FindTutor/FindTutor'
import Profile from '../../pages/shared/Profile/Profile'
import Schedule from '../../pages/shared/Schedule/Schedule'

function TutoreeView() {
  let { url } = useRouteMatch();
  const { authState } = useStateValue();
  const history = useHistory();

  console.log('TutoreeView')

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

  const redirect = () => {
    history.push('/')
  }

  return (
    <div className='tutoreeView'>
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

export default TutoreeView

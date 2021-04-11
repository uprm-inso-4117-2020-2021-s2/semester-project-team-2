import React, { useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Home from './pages/shared/Home/Home'
import Signup from './pages/shared/Signup/Signup'
import Signin from './pages/shared/Signin/Signin'
import Navbar from './components/Navbar/Navbar'
import AddSubject from './pages/tutor/AddSubject/AddSubject'
import TutorView from './pages/tutor/TutorView'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'


// const navbarLinks = {
//   default: {
//     findTutor: ,
//   }
// }

/**
 * 
 * Follow the BEM convention with the css class names to avoid css issues
 * 
 */
function App() {
  const [userType, setUserType] = useState()
  // const [links, setLinks] = useState()
  const handleUserType = (uType) => {
    console.log(uType)
    setUserType(uType)
  }

  console.log('app')



  return (
    <div className='app'>
      <Router>
        <Navbar handleUserType={handleUserType} />
        <Switch>
          <Route exact path='/'>
            <Home handleUserType={handleUserType} />
          </Route>

          {/* sign up */}
          <Route exact path={`/signup`}>
            <Signup userType={userType} />
          </Route>

          {/* sign up - add subject */}
          <Route path='/signup/add-subject'>
            <AddSubject />
          </Route>

          {/* sign in */}
          <Route path='/signin'>
            <Signin />
          </Route>

          {/* Tutor View */}
          <Route exact path='/tutor/:view'>
            <TutorView />
          </Route>

          <Route>
            <h1>Page Not Found</h1>
          </Route>
        </Switch>
      </Router>
    </div >
  );
}

export default App;

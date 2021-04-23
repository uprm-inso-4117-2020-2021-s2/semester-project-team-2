import React from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Home from './pages/shared/Home/Home'
import Signup from './pages/shared/Signup/Signup'
import Signin from './pages/shared/Signin/Signin'
import Navbar from './components/Navbar/Navbar'
import TutorView from './pages/tutor/TutorView'
import TutoreeView from './pages/tutoree/TutoreeView'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

/**
 * 
 * Follow the BEM convention with the css class names to avoid css issues
 * 
 */
function App() {
  return (
    <div className='app'>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>

          {/* Sign up */}
          <Route exact path={`/signup/:user_type`}>
            <Signup />
          </Route>

          {/* Sign in */}
          <Route path='/signin'>
            <Signin />
          </Route>

          {/* Tutor View */}
          <Route exact path='/tutor/:view'>
            <TutorView />
          </Route>

          {/* Tutoree View */}
          <Route exact path='/tutoree/:view'>
            <TutoreeView />
          </Route>

          {/* Redirect */}
          <Route exact path={`/signup`}>
            <Redirect to={'signup/tutor'} />
          </Route>

          {/* Page Not Found */}
          <Route>
            <h1>Page Not Found</h1>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

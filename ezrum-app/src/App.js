import React from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Home from './pages/shared/Home/Home'
import Signup from './pages/shared/Signup/Signup'
import Signin from './pages/shared/Signin/Signin'
import Navbar from './components/Navbar/Navbar'
import AddSubject from './pages/tutor/AddSubject/AddSubject'
import TutorView from './pages/tutor/TutorView'
import TutoreeView from './pages/tutoree/TutoreeView'
import { useStateValue } from './context/Provider'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { GlobalProvider } from './context/Provider'


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
          <Route exact path={`/signup`}>
            <Signup />
          </Route>

          {/* Sign up - add subject */}
          <Route path='/signup/add-subject'>
            <AddSubject />
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

          <Route>
            <h1>Page Not Found</h1>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

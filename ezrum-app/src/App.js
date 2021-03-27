import React, { useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Home from './pages/Home/Home'
import Signup from './pages/Signup/Signup'
import Signin from './pages/Signin/Signin'
import Navbar from './components/Navbar/Navbar'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'


/**
 * 
 * Follow the BEM convention with the css class names to avoid css issues
 * 
 */
function App() {
  const [userType, setUserType] = useState()
  const handleUserType = (uType) => {
    console.log(uType)
    setUserType(uType)
  }



  return (
    <div className='app'>
      <Router>
        <Navbar handleUserType={handleUserType} />
        <Switch>
          <Route exact path='/'>
            <Home handleUserType={handleUserType} />
          </Route>
          <Route path={`/signup`}>
            <Signup userType={userType} />
          </Route>
          <Route path='/signin'>
            <Signin />
          </Route>
          {/* <Route path='/app' component={Layout} /> */}
          {/* <Redirect from="/app" to="/app" /> */}
          {/* <Route path='/app/:view' component={Layout} /> */}

          <Route>
            <h1>Page Not Found</h1>
          </Route>
        </Switch>
      </Router>
    </div >
  );
}

export default App;

import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Home from './pages/Home/Home'
import Signup from './pages/Signup/Signup'
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
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/signup' component={Signup} />
          {/* <Route path='/app' component={Layout} /> */}
          {/* <Redirect from="/app" to="/app" /> */}
          {/* <Route path='/app/:view' component={Layout} /> */}


          <Route>
            <h1>Page Not Found</h1>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

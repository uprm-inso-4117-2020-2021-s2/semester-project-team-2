import React, { Suspense, useState, useEffect } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Home from './pages/shared/Home/Home'
import Signup from './pages/shared/Signup/Signup'
import Signin from './pages/shared/Signin/Signin'
import Navbar from './components/Navbar/Navbar'
import TutorView from './pages/tutor/TutorView'
import TutoreeView from './pages/tutoree/TutoreeView'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
// import { createResource } from './PersonApi'
// import { Person } from './Person'
// import { Num } from './Num'
// import { ErrorBoundary } from './ErrorBoundary'
// import { wrapPromise } from './PersonApi'
// import { PostResult } from './PostResult'
// import { useStateValue } from './context/Provider'

// const initialResource = createResource()

/**
 * 
 * Follow the BEM convention with the css class names to avoid css issues
 * 
 */
function App() {
  // useEffect(() => {
  // const authData = {
  //   first_name: 'Kevin',
  //   last_name: 'Ramirez',
  //   email: 'c@yahoo.com',
  //   password: 'finallyworked',
  //   user_type: 'tutor'
  // };
  // fetch('http://localhost:5000/api/users', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(authData)
  //   // body: authData
  // })
  //   .then(res => {
  //     console.log('res', res)
  //     return res.json()
  //   })
  //   .then(data => { console.log(data) });


  // fetch('http://127.0.0.1:5000/api/users', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
  //   // body: JSON.stringify(authData)
  //   body: authData
  // })
  //   .then(res => {
  //     console.log('res', res)
  //     return res.text()
  //   })
  //   .then(data => { console.log('data', data) });
  // })

  // const api = axios.create({
  //   baseURL: `http://localhost:5000/`,
  //   // headers: {
  //   //   'X-auth-key': "token123"
  //   // }
  // })

  // const authData = {
  //   first_name: authState.first_name,
  //   last_name: authState.last_name,
  //   email: authState.email,
  //   password: authState.password
  // };
  // // axios.post('http://localhost:5000/api/users', authData)
  // const authentication = async () => {
  //   const authData = {
  //     email: authState.email,
  //     password: authState.password
  //   };
  //   let res = await api.post(`/api/users/`, authData)
  //     .catch(err => console.log(err))
  //   // .then(data => {
  //   //   console.log('subjectsssss', data['data'])
  //   //   // setSubject(data['data'])
  //   // })
  //   console.log(res)
  // }
  // axios.post(`/api/users`, authData)
  //   .then(res => {
  //     console.log('response')
  //     console.log(res)
  //   })
  //   .catch(err => {
  //     console.log(err)
  //   })
  // const [resource, setResource] = useState(() => createResource());


  // const [resource, setResource] = useState(initialResource)
  // const [postResource, setPostResource] = useState({
  //   result: {
  //     read() {
  //       return null
  //     }
  //   }
  // })
  // const { authState } = useStateValue();

  // console.log('appppp', authState.user_id)


  return (
    // <div className='app'>
    //   <div>another random string</div>
    //   <Suspense fallback={
    //     <h1>loading num...</h1>
    //   }>
    //     <Num resource={resource} />
    //   </Suspense>
    //   <Suspense fallback={
    //     <h1>loading person...</h1>
    //   }>
    //     <ErrorBoundary>
    //       <Person resource={resource} />
    //       <PostResult resource={postResource} />
    //     </ErrorBoundary>
    //   </Suspense>

    //   <button onClick={() => {
    //     const promise = fetch('http://localhost:5000/api/users', {
    //       method: 'POST',
    //       body: JSON.stringify({ hello: 'world' })
    //     }).then(x => x.json()).then(x => {
    //       console.log('x', x)
    //       return x
    //     })

    //     setPostResource(wrapPromise(promise))
    //   }}>POST REQUEST</button>

    //   <button onClick={() => {
    //     setResource(createResource())
    //   }}>refresh data</button>
    // </div>


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

          {/* <Route exact path='/tutor/:view/:id'>
            <TutorView />
          </Route> */}

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

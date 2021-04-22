import React, { useState, useEffect, Suspense } from 'react'
import { useStateValue } from '../../../context/Provider'
// import { createResource } from '../../../PersonApi'
// import { Subjectss } from '../../../Subjectss'

// const initialResource = createResource()

// you can add here if you want
const subjectss = [
  {
    subject: 'Calculo I',
    tutor: 'Hector Bencosme',
    description: 'I have been a calculus tutor for about 4 years now. I enjoy teaching and Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  }, {
    subject: 'Physics I',
    tutor: 'Jovan Mangual',
    description: 'I have been a physics tutor for about 2 years now. I enjoy teaching and Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  }
]

function Subjects() {
  const [subjects, setSubjects] = useState([])
  // const [resource, setResource] = useState(initialResource)
  const { authState, tutorState, tutorDispatch } = useStateValue();

  // const [auth, setAuth] = useState(authState)
  console.log('Subjects')
  // console.log('tutorState', tutorState)
  // console.log('authState', authState)

  useEffect(() => {
    console.log('authState.user_id', authState.user_id)
    // setTimeout(() => {
    //   console.log('--', authState, tutorState)
    //   return console.log('authState.user_id', authState.user_id)
    // }, 4000);
    // setTimeout(() => (fetch(`http://localhost:5000/api/subjects/${authState.user_id}`, {
    //   method: 'GET',
    //   headers: { 'Content-Type': 'application/json' },
    // })
    //   .then(res => res.json())
    //   .then(user => {
    //     console.log('user', user)
    //   })
    //   .catch(err => console.log(err)))(), 3000);
  }, [])

  useEffect(() => {
    console.log('authState.user_id', authState.user_id);
    if (authState.user_id)
      fetch(`http://localhost:5000/api/subjects/${authState.user_id}`, {
        // fetch(`http://localhost:5000/api/subjects/1`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })
        .then(res => res.json())
        .then(subjects => {
          console.log('subjects', subjects)
        })
        .catch(err => console.log(err))
  }, [authState])

  useEffect(() => {
    console.log('authState.user_id', authState.user_id);
    if (authState.user_id)
      fetch(`http://localhost:5000/api/subjects/${authState.user_id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })
        .then(res => res.json())
        .then(subjects => {
          console.log('subjects', subjects)
        })
        .catch(err => console.log(err))
  }, [tutorState])

  // console.log('--', authState, tutorState)


  return (
    <div className='subjects'>
      <h2>MY SUBJECTS</h2>
      <hr className='m-0' />
      {/* <Suspense fallback={
        <h1>loading num...</h1>
      }>
        <Subjectss resource={resource} user_id={authState.user_id} />
      </Suspense> */}
      {/* {
        // authState.user_id
        //   ?
          // <>
            // <h2>MY SUBJECTS</h2>
            // <hr className='m-0' />
            // <Suspense fallback={
            //   <h1>loading num...</h1>
            // }>
            //   <Num resource={resource} />
            // </Suspense>
        // </>
        // : null
      } */}

    </div>
  )
}

export default Subjects

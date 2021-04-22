import React, { useState, useEffect } from 'react'
import { useStateValue } from '../../../context/Provider'

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
  const { authState } = useStateValue();

  useEffect(() => {
    console.log('tutorView useEffect', authState.tutor_id, authState)
    if (authState.tutor_id)
      fetch(`http://localhost:5000/api/subjects/${authState.tutor_id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })
        .then(res => res.json())
        .then(subjects => {
          console.log('subjects', subjects)
          setSubjects(subjects)
        })
        .catch(err => console.log(err))
  }, [authState])



  return (
    <div className='subjects'>
      <h2>MY SUBJECTS</h2>
      <hr className='m-0' />
      {/* {
        subjects?.map(({ subject_name, price, pricing_rate, description }) => {
          return (
            <div className="d-flex ">
              Insert subject styling here 
            </div>
          )
        })
      } */}

      {
        subjects?.map(subject => {
          return (
            <div key={subject.subject_name} className="d-flex ">
              {JSON.stringify(subject)}
            </div>
          )
        })
      }
    </div>
  )
}

export default Subjects

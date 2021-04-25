import React, { useState } from 'react'
import './FindTutor.css'
// import { useFetch } from '../../../hooks/useFetch'

function FindTutor() {
  const [tutors, setTutors] = useState([])
  console.log(setTutors)
  // const [selectedSubject, setSelectedSubject] = useState('')
  // const options = {
  //   method: 'GET',
  //   headers: { 'Content-Type': 'application/json' },
  // }
  // useFetch(`/tutors/subject/2`, options, setTutors, undefined, undefined);
  // useFetch(`/tutors/subject/${subject.subject_id}`, options, setTutors, undefined, undefined, authState);

  console.log('tutors', tutors)
  return (
    <div className='findTutor'>
      <h2>FIND TUTOR</h2>
      <hr className='m-0' />
      {
        tutors?.map(tutor => {
          return (
            <div key={tutor.tutor_id} className="d-flex ">
              {JSON.stringify(tutor)}
            </div>
          )
        })
      }
    </div>
  )
}

export default FindTutor

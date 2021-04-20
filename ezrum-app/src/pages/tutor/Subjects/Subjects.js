import React from 'react'
import { useStateValue } from '../../../context/Provider'

// you can add here if you want
const subjects = [
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
  const { authState, tutorState } = useStateValue();

  console.log('--', authState, tutorState)
  return (
    <div className='subjects'>
      <h2>MY SUBJECTS</h2>
      <hr className='m-0' />
    </div>
  )
}

export default Subjects

import react from 'react'
// import { useStateValue } from './context/Provider'

export const Subjectss = ({ resource }) => {
  // const { authState, tutorState } = useStateValue();

  const n = resource.subjects.read()
  console.log('n', n)
  return <div>
    your random number is: {n.length}
  </div>
}
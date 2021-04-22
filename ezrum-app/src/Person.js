import React from 'react'

export const Person = ({ resource }) => {
  const users = resource.person.read();
  console.log('users')
  console.log(users)
  console.log(users[0])
  return (
    <div>
      {/* {person.name.first} */}
      {/* {users[0]} */}
      {JSON.stringify(users[0])}
    </div>
  )
}
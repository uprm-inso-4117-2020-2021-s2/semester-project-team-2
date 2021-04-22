import react from 'react';
import { useStateValue } from './context/Provider'

const fetchPerson = () => {
  // const { authState } = useStateValue()
  // console.log('authState', authState)
  return fetch(`http://localhost:5000/api/users`)
    .then(x => x.json())
    .then(users => {
      console.log('xxxx', users)
      return users
    });
  // return fetch('http://randomuser.me/api')
  //   .then(x => x.json())
  //   .then(x => {
  //     console.log(x)
  //     return x.results[0]
  //   });
}

export const wrapPromise = (promise) => {
  let status = 'pending';
  let result = '';
  let suspender = promise.then(r => {
    status = 'success'
    result = r
  }, e => {
    status = 'error'
    result = e
  })

  return {
    read() {
      if (status === 'pending') {
        throw suspender
      }
      else if (status === 'error') {
        throw result
      }

      return result;
    }
  }
}

export const randomNumber = (user_id) => {
  // const { authState, tutorState } = useStateValue();

  console.log('uid', user_id)


  return fetch(`http://localhost:5000/api/users/${user_id}`)
    // return fetch(`http://localhost:5000/api/users`)
    .then(x => x.json())
    .then(users => {
      console.log('xxxx', users)
      // return users
      return users
    });

  return new Promise(res => {
    setTimeout(() => res(Math.random()), 3000);
  })

  // return new Promise(res => {
  //   setTimeout(() => res(Math.random()), 3000);
  // })
}

export const createResource = () => {
  return {
    person: wrapPromise(fetchPerson()),
    // subjects: wrapPromise(randomNumber(user_id))
    subjects: wrapPromise(randomNumber())
  }
}
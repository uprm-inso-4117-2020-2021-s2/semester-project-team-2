import { useState, useEffect } from 'react';

const baseUrl = 'http://localhost:5000/api/'

// it may be better to replace setter, condition, and dispatch with an obj that 
// expects those attributes and apply conditions when the obj does not contain one
export const useFetch = (endpoint, options, setter, condition, dispatch, ...dependencies) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  console.log('setter', setter)
  console.log('condition', condition)
  console.log('dispatch', dispatch)

  console.log('baseUrl + endpoint', (baseUrl + endpoint))
  const stringifiedUrl = JSON.stringify(baseUrl + endpoint)

  useEffect(() => {
    if (condition !== undefined || condition) {
      // console.log('endpoint', endpoint)
      // console.log('options', options)
      fetch((baseUrl + endpoint), options)
        .then(res => res.json())
        .then(data => {
          console.log('data', data)
          if (setter)
            setter(data)
          // if (dispatch)
          //   execute dispatch somehow?
          setResponse(data)
        })
        .catch(err => console.log(err))
    }
  }, [stringifiedUrl, ...dependencies]);

  return { response, error };
};

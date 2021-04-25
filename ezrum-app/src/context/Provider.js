import React, { createContext, useContext, useReducer } from 'react'
import auth from './reducers/auth';
import tutor from './reducers/tutor';
import authInitialState from './initialStates/authInitialState';
import tutorInitialState from './initialStates/tutoreeInitialState';
// import tutoreeInitialState from './initialStates/tutoreeInitialState';

export const GlobalContext = createContext();

// hoc - allows us to wrap the app inside of the State Provider
// and provides that data layer functionality to be able to pass 
// any of the children components 
// export const GlobalProvider = ({ reducer, initialState, children }) => {
export const GlobalProvider = ({ children }) => {
  const [authState, authDispatch] = useReducer(auth, authInitialState)
  const [tutorState, tutorDispatch] = useReducer(tutor, tutorInitialState)
  // const [tutoreeState, tutoreeDispatch] = useReducer(tutoree, tutoreeInitialState)

  return (
    <GlobalContext.Provider value={{
      authState, authDispatch,
      tutorState, tutorDispatch,
    }}>
      {children}
    </GlobalContext.Provider>
  )
}

// used to pull something from the data layer
export const useStateValue = () => useContext(GlobalContext);
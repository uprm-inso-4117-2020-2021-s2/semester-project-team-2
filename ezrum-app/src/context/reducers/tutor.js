export const actionTypes = {
  ADD_SUBJECT: "ADD_SUBJECT",
  REMOVE_SUBJECT: "REMOVE_SUBJECT",
}

const tutor = (state, action) => {
  console.log('state, action')
  console.log(state, action)
  switch (action.type) {
    case actionTypes.ADD_SUBJECT:
      console.log('[...state.subjects]', [...state.subjects])
      console.log(action.tutor)
      console.log({
        subjects: [...state.subjects, action.subject],
        tutor_id: action.tutor_id
      })
      return {
        subjects: [...state.subjects, action.subject]
      }
    // return [...state.subjects, action.subject]

    case actionTypes.REMOVE_SUBJECT:
      // we may not implement this
      return [...state];
    default:
      return state
  }
}

export default tutor;
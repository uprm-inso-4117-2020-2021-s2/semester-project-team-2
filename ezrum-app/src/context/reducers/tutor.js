export const actionTypes = {
  ADD_SUBJECT: "ADD_SUBJECT",
  REMOVE_SUBJECT: "REMOVE_SUBJECT",
}

const tutor = (state, action) => {
  console.log('-state', state)
  console.log('-action', action)
  if (!state.subjects)
    state['subjects'] = []

  switch (action.type) {
    case actionTypes.ADD_SUBJECT:
      console.log('[...state.subjects]', [...state.subjects])
      console.log({
        subjects: [...state.subjects, action.subject],
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
export const actionTypes = {
  ADD_SUBJECT: "ADD_SUBJECT",
  REMOVE_SUBJECT: "REMOVE_SUBJECT",
}

const auth = (state, action) => {
  console.log('state, action')
  console.log(state, action)
  switch (action.type) {
    case actionTypes.ADD_SUBJECT:
      console.log('---------')
      return {
        ...state,
        subjects: action.subjects
      };
    case actionTypes.REMOVE_SUBJECT:

      return {
        ...state,
      };
    default:
      return state
  }
}

export default auth;
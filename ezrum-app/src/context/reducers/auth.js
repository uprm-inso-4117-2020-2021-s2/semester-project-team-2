export const actionTypes = {
  SET_USER: "SET_USER",
  SET_USER_ID: "SET_USER_ID",

  REMOVE_USER: "REMOVE_USER",
}

const auth = (state, action) => {
  console.log('state', state)
  console.log('action', action)
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        ...action
      };
    case actionTypes.SET_USER_ID:

      return {
        ...state,
        user_id: action.user_id,
        tutor_id: action.tutor_id
      };
    case actionTypes.REMOVE_USER:
      return {
        ...state,
        user: null,
      };
    default:
      return state
  }
}

export default auth;
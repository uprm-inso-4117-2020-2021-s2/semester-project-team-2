export const actionTypes = {
  SET_USER: "SET_USER",
  REMOVE_USER: "REMOVE_USER",
}

const auth = (state, action) => {
  console.log('state, action')
  console.log(state, action)
  switch (action.type) {
    case actionTypes.SET_USER:
      console.log('---------')
      return {
        ...state,
        user: action.user
      };
    case actionTypes.REMOVE_USER:
      return {
        ...state,
        user: null
      };
    default:
      return state
  }
}

export default auth;
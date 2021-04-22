export const actionTypes = {
  SET_USER: "SET_USER",
  SET_USER_ID: "SET_USER_ID",

  REMOVE_USER: "REMOVE_USER",
}

const auth = (state, action) => {
  console.log('state, action')
  console.log(state, action)
  switch (action.type) {
    case actionTypes.SET_USER:
      console.log('+++++++')
      console.log(action.first_name)
      return {
        ...state,
        ...action
        // first_name: state.first_name,
        // last_name: state.last_name,
        // email: state.email,
        // password: state.password,
        // user_type: state.user_type
      };
    case actionTypes.SET_USER_ID:
      const s = {
        ...state,
        user_id: action.user_id
      }
      console.log('\'\'\'\' ', s)
      return {
        ...state,
        user_id: action.user_id
      };
    case actionTypes.REMOVE_USER:
      return {
        ...state,
        user: null,
        // userType: null
      };
    default:
      return state
  }
  // switch (action.type) {
  //   case actionTypes.SET_USER:
  //     console.log('---------')
  //     return {
  //       ...state,
  //       user: action.user,
  //       // userType: action.userType
  //     };
  //   case actionTypes.REMOVE_USER:
  //     return {
  //       ...state,
  //       user: null,
  //       // userType: null
  //     };
  //   default:
  //     return state
  // }
}

export default auth;
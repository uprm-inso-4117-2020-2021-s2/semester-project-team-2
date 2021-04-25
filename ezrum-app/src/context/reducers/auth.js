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
      let obj = {
        ...state,
        ...action
      }

      if (action.user_type === 'tutoree') {
        obj['tutoree_id'] = obj['tutor_id']
        delete obj['tutor_id']
      }
      console.log('obj', obj)
      return obj;
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
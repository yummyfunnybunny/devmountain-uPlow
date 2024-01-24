const initialState = {
  loggedIn: false,
  user_id: '',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  role: '',
};

function loggedInReducer(state = initialState, action) {
  switch (action.type) {
    case true:
      // return { ...state, loggedIn: true };
      return {
        ...state,
        loggedIn: true,
        user_id: action.payload.user_id,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        email: action.payload.email,
        phone: action.payload.phone,
        role: action.payload.role,
      };
    case false:
      return {
        ...state,
        loggedIn: false,
        user_id: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        role: '',
      };
    default:
      return state;
  }
}

export default loggedInReducer;

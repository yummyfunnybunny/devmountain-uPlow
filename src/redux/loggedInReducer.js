const initialState = {
  loggedIn: false,
  user_id: '',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  street: '',
  city: '',
  state: '',
  zipcode: '',
  coordinates: '',
  role: '',
};

function loggedInReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_LOGGED_IN':
      // return { ...state, loggedIn: true };
      return {
        ...state,
        loggedIn: true,
        user_id: action.payload.user_id,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        email: action.payload.email,
        phone: action.payload.phone,
        street: action.payload.street,
        city: action.payload.city,
        state: action.payload.state,
        zipcode: action.payload.zipcode,
        coordinates: action.payload.coordinates,
        role: action.payload.role,
      };
    case 'RESET_LOGGED_IN':
      return {
        ...state,
        loggedIn: false,
        user_id: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        street: '',
        city: '',
        state: '',
        zipcode: '',
        coordinates: '',
        role: '',
      };
    default:
      return state;
  }
}

export default loggedInReducer;

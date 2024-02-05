const initialState = {
  color: 'NONE',
  // title: '',
  message: '',
};

function toastReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_TOAST':
      console.log('SET TOAST!!!!!!!');
      console.log(action.payload);
      return {
        ...state,
        color: action.payload.color,
        // title: action.payload.title,
        message: action.payload.message,
      };
    case 'RESET_TOAST':
      return { ...state, color: 'NONE', message: '' };
    default:
      return state;
  }
}

export default toastReducer;

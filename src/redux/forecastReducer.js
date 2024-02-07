const initialState = {
  data: [],
};

const forecastReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_FORECAST':
      return { ...state, data: action.payload };
    case 'RESET_FORECAST':
      return { ...state, data: [] };
    default:
      return state;
  }
};

export default forecastReducer;

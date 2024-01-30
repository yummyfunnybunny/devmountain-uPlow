const initialState = {
  show: false,
};

function MapboxPopupReducer(state = initialState, action) {
  switch (action.type) {
    case 'SHOW_POPUP':
      return { ...state, show: true };
    case 'HIDE_POPUP':
      return { ...state, show: false };
    default:
      return state;
  }
}

export default MapboxPopupReducer;

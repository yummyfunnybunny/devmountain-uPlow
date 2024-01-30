const initialState = {
  dashMode: 'HOME',
};

function DashNavReducer(state = initialState, action) {
  switch (action.type) {
    case 'HOME':
      return { ...state, dashMode: 'HOME' };
    case 'ALERTS':
      return { ...state, dashMode: 'ALERTS' };
    case 'MESSAGES':
      return { ...state, dashMode: 'MESSAGES' };
    case 'MY_PROPERTIES':
      return { ...state, dashMode: 'MY_PROPERTIES' };
    case 'MY_JOBS':
      return { ...state, dashMode: 'MY_JOBS' };
    case 'MY_SUBSCRIPTIONS':
      return { ...state, dashMode: 'MY_SUBSCRIPTIONS' };
    case 'ACCOUNT':
      return { ...state, dashMode: 'ACCOUNT' };
    case 'FIND_JOBS':
      return { ...state, dashMode: 'FIND_JOBS' };
    case 'FIND_WORKERS':
      return { ...state, dashMode: 'FIND_WORKERS' };
    case 'SERVICE_HISTORY':
      return { ...state, dashMode: 'SERVICE_HISTORY' };
    case 'ACCOUNT':
      return { ...state, dashMode: 'ACCOUNT' };
    default:
      return state;
  }
}

export default DashNavReducer;

const initialState = {
  availableJobs: [],
};

function findJobsReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_FIND_JOBS':
      return { ...state, availableJobs: action.payload };
    case 'RESET_FIND_JOBS':
      return { ...state, availableJobs: [] };
    default:
      return state;
  }
}

export default findJobsReducer;

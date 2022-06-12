const userReducer = (state = [], action) => {
  switch (action.type) {
    case "PROFILE":
      return action.payload;

    case "UPDATE_PROFILE":
      return action.payload;
    default:
      return state;
  }
};

export default userReducer;

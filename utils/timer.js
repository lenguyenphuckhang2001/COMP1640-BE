const updateIsClose = (state, action) => {
  const { isClose } = action.payload;
  return { ...state, isClose };
};

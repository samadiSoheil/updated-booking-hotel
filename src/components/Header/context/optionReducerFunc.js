const optionReducerFunc = (state, action) => {
  switch (action.type) {
    case "INC__OPTION": {
      return {
        ...state,
        [action.payload]: state[action.payload] + 1,
      };
    }
    case "DEC__OPTION": {
      return {
        ...state,
        [action.payload]:
          [action.payload] == "children"
            ? state[action.payload] === 0
              ? 0
              : state[action.payload] - 1
            : state[action.payload] === 1
            ? 1
            : state[action.payload] - 1,
      };
    }
    default:
      return state;
  }
};

export { optionReducerFunc };

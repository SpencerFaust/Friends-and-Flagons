const gameReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_GAMES':
        return action.payload;
      case 'SET_MY_GAMES':
        return action.payload;
      case 'CREATED_GAMES':
        return action.payload;
      default:
        return state;
    }
  };

  export default gameReducer;
  
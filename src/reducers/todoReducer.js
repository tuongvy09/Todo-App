const initState = [];

const todoReducer = (state = initState, action) => {
    switch (action.type) {
        case 'ADD_TASK':
            return [...state, action.payload];
        case 'UPDATE_TASK':
            return state.map(todo =>
                todo.id === action.payload.id ? { ...todo, val: action.payload.val } : todo
            );
        case 'DELETE_TASK':
            return state.filter(todo => todo.id !== action.payload);
        case 'CHECK_TASK':
            return state.map(todo =>
                todo.id === action.payload ? { ...todo, isDone: !todo.isDone } : todo
            );
        default:
            return state;
    }
};

export default todoReducer;
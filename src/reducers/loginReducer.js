const initialState = {
    isAuthenticated: false,
    accessToken: null,
    refreshToken: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                isAuthenticated: true,
                accessToken: action.payload.accessToken,
                refreshToken: action.payload.refreshToken,
            };
        case 'LOGOUT':
            return initialState;
        default:
            return state;
    }
};

export default authReducer;
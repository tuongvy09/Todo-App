export const loginAction = (accessToken, refreshToken) => ({
    type: 'LOGIN',
    payload: { accessToken, refreshToken },
});

export const logout = () => ({
    type: 'LOGOUT',
});
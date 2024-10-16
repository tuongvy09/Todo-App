import axios from 'axios';
import { loginAction } from '../actions/loginAction';
import store from '../store';

const axiosInstance = axios.create({
    baseURL: 'https://hcm.mobifone.vn/payment_be_test',
});

axiosInstance.interceptors.request.use(config => {
    const { accessToken } = store.getState().auth; 
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
});

export const login = async (username, password) => {
    try {
        const response = await axiosInstance.post('/admin/auth/login', {
            username,
            password,
        });
        
        const access_Token = response.data.access_token;
        const refresh_Token = response.data.refresh_token;

        store.dispatch(loginAction(access_Token, refresh_Token));
        return { response, access_Token, refresh_Token }; 
        
    } catch (error) {
        console.error('Error during login:', error);
        throw error;
    }
};


export default axiosInstance;
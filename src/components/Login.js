import { Box, Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginAction } from '../actions/loginAction';
import { login } from '../api/axiosInstance';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const nagative = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await login(username, password)
            const access_token = response.access_Token;
            const refresh_token = response.refresh_Token;
            dispatch(loginAction(access_token, refresh_token));
            nagative('/todos');
        } catch (error) {
            alert("Mật khẩu hoặc tên người dùng sai vui lòng kiểm tra lại")
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, height: 500, width: 300}}>
                <TextField
                    label="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <TextField
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <Button variant="contained" type="submit">
                    Đăng Nhập
                </Button>
            </Box>
        </form>
    );
};

export default Login;
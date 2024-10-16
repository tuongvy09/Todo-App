// src/App.js
import React from "react";
import { useSelector } from 'react-redux';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./components/Login";
import TodoList from "./components/TodoList";

function App() {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    return (
        <Router>
            <div>
                <h1>Todo Application</h1>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/todos" element={isAuthenticated ? <TodoList /> : <Login />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
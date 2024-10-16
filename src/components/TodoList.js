import {
  Button,
  Checkbox,
  List,
  ListItem,
  TextField,
  Typography
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../actions/loginAction";
import { addTask, checkTask, deleteTask, updateTask } from "../actions/todoAction";

const TodoList = () => {
  const [inputVal, setInputVal] = useState("");
  const [isEdited, setIsEdited] = useState(false);
  const [editedId, setEditedId] = useState(null);
  const todos = useSelector(state => state.todo);
  const dispatch = useDispatch();
  const nagative = useNavigate();

  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      const parsedTodos = JSON.parse(savedTodos);
      if (Array.isArray(parsedTodos)) {
        parsedTodos.forEach(todo => dispatch(addTask(todo)));
      } else {
        console.error("Parsed todos is not an array:", parsedTodos);
      }
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleClick = () => {
    if (!inputVal.trim()) {
      alert("Task cannot be empty");
      return;
    }
    if (!isEdited) {
      dispatch(addTask({ val: inputVal, isDone: false, id: Date.now() }));
    } else {
      dispatch(updateTask({ id: editedId, val: inputVal }));
    }
    setInputVal("");
    setIsEdited(false);
    setEditedId(null);
  };

  const handlelogout = () => {
    dispatch(logout());
    nagative('/');

  };
  const onDelete = (id) => {
    dispatch(deleteTask(id));
    if (isEdited && editedId === id) {
      setInputVal("");
      setIsEdited(false);
      setEditedId(null);
    }
  };

  const handleDone = (id) => {
    dispatch(checkTask(id));
  };

  const handleEdit = (id) => {
    const editVal = todos.find((todo) => todo.id === id);
    setInputVal(editVal.val);
    setEditedId(id);
    setIsEdited(true);
  };

  return (
    <div>
      <TextField
        variant="outlined"
        onChange={(e) => setInputVal(e.target.value)}
        label="Type your task"
        value={inputVal}
        style={{ width: "70%", marginBottom: 30 }}
      />
      <Button
        size="large"
        variant={isEdited ? "outlined" : "contained"}
        color="primary"
        onClick={handleClick}
        style={{ height: 55, marginBottom: 30 }}
        disabled={!inputVal.trim()}
      >
        {isEdited ? "Edit Task" : "Add Task"}
      </Button>
      <List>
        {Array.isArray(todos) && todos.length > 0 ? (
          todos.map((todo) => (
            <ListItem key={todo.id} divider sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Checkbox
                  checked={todo.isDone}
                  onClick={() => handleDone(todo.id)}
                  aria-label={`Mark ${todo.val} as done`}
                />
                <Typography style={{ textDecoration: todo.isDone ? 'line-through' : 'none' }}>
                  {todo.val}
                </Typography>
              </div>
              <div>
                <Button onClick={() => handleEdit(todo.id)} style={{ marginRight: 8 }}>Edit</Button>
                <Button onClick={() => onDelete(todo.id)} color="secondary">Delete</Button>
              </div>
            </ListItem>
          ))
        ) : (
          <Typography>No tasks available</Typography>
        )}
      </List>
      <Button onClick={handlelogout}>Đăng xuất</Button>
    </div>
  );
};

export default TodoList;
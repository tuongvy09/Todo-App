export const addTask = (payload) => {
    return {
        type: "ADD_TASK",
        payload 
    };
};

export const updateTask = (payload) => {
    return {
        type: "UPDATE_TASK",
        payload
    };
};

export const deleteTask = (payload) => {
    return {
        type: "DELETE_TASK",
        payload
    };
};

export const checkTask = (payload) => {
    return {
        type: "CHECK_TASK",
        payload
    };
};
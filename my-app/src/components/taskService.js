import axios from "axios";

const API_BASE_URL = "http://localhost:8070/api/tasks";

export const getCurrentUserId = () => {
    return localStorage.getItem('userId');
};

// Function to get tasks
export const getTasks = async (userId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/user/${userId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching tasks:", error);
        throw error;
    }
};

export const addTask = async (task) => {
    try {
        const response = await axios.post(`${API_BASE_URL}`, task, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error adding task:", error);
        throw error;
    }
};

// Function to update task priority
export const updateTaskPriority = async (taskId, newPriority) => {
    try {
        const response = await axios.patch(`${API_BASE_URL}/${taskId}/priority`, { priority: newPriority }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error updating task priority:", error);
        throw error;
    }
};

// Function to update task text
export const updateTaskText = async (taskId, newText) => {
    try {
        const response = await axios.patch(`${API_BASE_URL}/${taskId}/text`, { text: newText }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error updating task text:", error);
        throw error;
    }
};

// Function to update task reminder
export const updateTaskReminder = async (taskId, reminderTime) => {
    try {
        const response = await axios.patch(`${API_BASE_URL}/${taskId}/reminder`, { reminderTime }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error updating task reminder:", error);
        throw error;
    }
};

// Function to delete a task
export const deleteTask = async (taskId) => {
    try {
        await axios.delete(`${API_BASE_URL}/${taskId}`);
    } catch (error) {
        console.error("Error deleting task:", error);
        throw error;
    }
};
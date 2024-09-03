import React, { useEffect, useState } from "react";
import axios from 'axios';
import { getTasks, addTask, updateTaskPriority, deleteTask, updateTaskText, updateTaskReminder,getCurrentUserId } from './taskService';
import { format, isPast } from 'date-fns';
import { Bell, Edit, Trash2, Save } from 'lucide-react';
import './TaskDashboard.css';
import Header from "./Header/Header";
import Footer from "./Footer/Footer";


const API_URL = 'http://localhost:8070/api/tasks';

const TaskDashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [textInput, setTextInput] = useState("");
    const [selectedPriority, setSelectedPriority] = useState("High");
    const [reminderTime, setReminderTime] = useState("");
    const [editingTask, setEditingTask] = useState(null);
    const [taskText, setTaskText] = useState("");
    const [alert, setAlert] = useState(null);
    const [notifications, setNotifications] = useState([]);
    const [showNotifications, setShowNotifications] = useState(false);
    

    useEffect(() => {
        fetchTasks();
        const intervalId = setInterval(() => {
            fetchNotifications();
            checkReminders();
        }, 60000); // Check every minute
        return () => clearInterval(intervalId);
    }, []);

    const fetchTasks = async () => {
        try {
            const userId = getCurrentUserId();
            const tasksData = await getTasks(userId);
            setTasks(tasksData);
        } catch (error) {
            showAlert("Error fetching tasks", "error");
        }
    };

    const fetchNotifications = async () => {
        try {
            const response = await axios.get(`${API_URL}/notifications`);
            if (response.data && response.data.length > 0) {
                setNotifications(response.data);
                showAlert("You have new notifications", "info");
            }
        } catch (error) {
            console.error("Error fetching notifications", error);
        }
    };

    const checkReminders = () => {
        const now = new Date();
        tasks.forEach(task => {
            if (task.reminderTime && isPast(new Date(task.reminderTime)) && !notifications.some(n => n.id === task.id)) {
                setNotifications(prevNotifications => [...prevNotifications, task]);
                showAlert(`Reminder: ${task.text}`, "info");
            }
        });
    };

    const showAlert = (message, type = "success") => {
        setAlert({ message, type });
        setTimeout(() => setAlert(null), 3000);
    };

    const handleTaskSubmit = async () => {
        if (textInput.trim() === "") return;

        try {
            const userId = getCurrentUserId();
            const newTask = { 
                userId, // Include the user ID
                text: textInput, 
                priority: selectedPriority,
                reminderTime: reminderTime ? new Date(reminderTime).toISOString() : null
            };
            const addedTask = await addTask(newTask);
            setTasks([...tasks, addedTask]);
            setTextInput("");
            setSelectedPriority("High");
            setReminderTime("");
            showAlert("Task added successfully");
        } catch (error) {
            showAlert("Error adding task", "error");
        }
    };

    const handlePriorityUpdate = async (taskId, newPriority) => {
        try {
            const updatedTask = await updateTaskPriority(taskId, newPriority);
            setTasks(tasks.map(task => task.id === taskId ? updatedTask : task));
            showAlert("Task priority updated");
        } catch (error) {
            showAlert("Error updating task priority", "error");
        }
    };

    const handleTextUpdate = async (taskId) => {
        if (taskText.trim() !== "") {
            try {
                await updateTaskText(taskId, taskText);
                setTasks(tasks.map(task => task.id === taskId ? { ...task, text: taskText } : task));
                setEditingTask(null);
                setTaskText("");
                showAlert("Task text updated");
            } catch (error) {
                showAlert("Error updating task text", "error");
            }
        }
    };

    const handleRemove = async (taskId) => {
        try {
            await deleteTask(taskId);
            setTasks(tasks.filter(task => task.id !== taskId));
            showAlert("Task deleted successfully");
        } catch (error) {
            showAlert("Error deleting task", "error");
        }
    };

    const handleReminderUpdate = async (taskId, newReminderTime) => {
        try {
            const updatedTask = await updateTaskReminder(taskId, newReminderTime);
            setTasks(tasks.map(task => task.id === taskId ? updatedTask : task));
            showAlert("Reminder set successfully");
        } catch (error) {
            showAlert("Error setting reminder", "error");
        }
    };

    const handleClearNotifications = () => {
        setNotifications([]);
        showAlert("Notifications cleared");
    };

    const getTasksByPriority = (priority) => tasks.filter((task) => task.priority === priority);

    return (
        <div className="task-dashboard">
            {<Header />}
            <div className="task-dashboard-header">
            
            <h1>Task Dashboard</h1>
            <div className="notification-icon" onClick={() => setShowNotifications(!showNotifications)}>
                <Bell size={22} />
                {notifications.length > 0 && <span className="notification-badge">{notifications.length}</span>}
            </div>
            {showNotifications && (
                <div className="notification-dropdown">
                    {notifications.length > 0 ? (
                        <>
                            {notifications.map((task, index) => (
                                <div key={index} className="notification-item">
                                    <span>{`Reminder: ${task.text}`}</span>
                                </div>
                            ))}
                            <button onClick={handleClearNotifications} className="clear-notifications-btn">
                                Clear Notifications
                            </button>
                        </>
                    ) : (
                        <div className="notification-item">No new notifications</div>
                    )}
                </div>
            )}
            </div>
            <div className="task-input">
                <input
                    type="text"
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    placeholder="Enter task"
                />
                <select
                    value={selectedPriority}
                    onChange={(e) => setSelectedPriority(e.target.value)}
                >
                    <option value="High">High Priority</option>
                    <option value="Medium">Medium Priority</option>
                    <option value="Low">Low Priority</option>
                </select>
                <input
                    type="datetime-local"
                    value={reminderTime}
                    onChange={(e) => setReminderTime(e.target.value)}
                />
                <button onClick={handleTaskSubmit}>Add Task</button>
            </div>

            <div className="task-lists">
                {["High", "Medium", "Low"].map((priority) => (
                    <div key={priority} className="task-list">
                        <h2>{priority} Priority Tasks</h2>
                        {getTasksByPriority(priority).map((task) => (
                            <div key={task.id} className="task-item">
                                {editingTask?.id === task.id ? (
                                    <div className="task-edit">
                                        <input
                                            type="text"
                                            value={taskText}
                                            onChange={(e) => setTaskText(e.target.value)}
                                            onKeyPress={(e) => e.key === 'Enter' && handleTextUpdate(task.id)}
                                        />
                                        <button onClick={() => handleTextUpdate(task.id)}><Save size={16} /> Save</button>
                                    </div>
                                ) : (
                                    <span>{task.text}</span>
                                )}
                                <div className="task-actions">
                                    <select
                                        value={task.priority}
                                        onChange={(e) => handlePriorityUpdate(task.id, e.target.value)}
                                    >
                                        <option value="High">High</option>
                                        <option value="Medium">Medium</option>
                                        <option value="Low">Low</option>
                                    </select>
                                    <button onClick={() => {
                                        setEditingTask(task);
                                        setTaskText(task.text);
                                    }}><Edit size={16} /> Edit</button>
                                    {editingTask?.id === task.id ? (
                                        <button onClick={() => handleTextUpdate(task.id)}><Save size={16} /> Save Changes</button>
                                    ) : null}
                                    <button onClick={() => handleRemove(task.id)}><Trash2 size={16} /> Delete</button>
                                    <input
                                        type="datetime-local"
                                        value={task.reminderTime ? format(new Date(task.reminderTime), "yyyy-MM-dd'T'HH:mm") : ""}
                                        onChange={(e) => handleReminderUpdate(task.id, e.target.value)}
                                    />
                                    {task.reminderTime && (
                                        <span className="reminder-icon">🔔</span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            {<Footer/>}

            {alert && (
                <div className={`alert ${alert.type}`}>
                    {alert.message}
                </div>
            )}
        </div>
    );
};

export default TaskDashboard;
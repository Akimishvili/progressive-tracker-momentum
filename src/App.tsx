import './App.css'
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import TaskDashboard from './pages/TaskDashboard';
import TaskDetail from "./pages/TaskDetail.tsx";
import CreateTask from "./pages/CreateTask.tsx";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* This route uses MainLayout as the wrapper */}
                <Route path="/" element={<MainLayout />}>
                    {/* The default route renders TaskDashboard */}
                    <Route index element={<TaskDashboard />} />
                    {/* The route renders TaskDetail */}
                    <Route path="tasks/:taskId" element={<TaskDetail />} />
                    {/* The route renders CreateTask */}
                    <Route path="tasks/create" element={<CreateTask />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;

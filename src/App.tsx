import './App.css'
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import TaskDashboard from './pages/TaskDashboard';

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* This route uses MainLayout as the wrapper */}
                <Route path="/" element={<MainLayout />}>
                    {/* The default route renders TaskDashboard */}
                    <Route index element={<TaskDashboard />} />
                    {/* You can add more nested routes here */}
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;

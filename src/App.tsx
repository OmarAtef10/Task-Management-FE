import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import TaskDetails from "./pages/TaskDetails";
import TaskForm from "./pages/TaskForm";
import LoginRegister from "./pages/LoginRegister";

function App() {
  return (
     <Routes>
      <Route path="/" element={<LoginRegister />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/task/:id" element={<TaskDetails />} />
      <Route path="/create" element={<TaskForm />} />
      <Route path="/edit/:id" element={<TaskForm />} />
    </Routes>
  );
}

export default App;

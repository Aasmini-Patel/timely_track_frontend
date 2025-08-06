import React, { useEffect } from "react";
import Layout from "./components/global/Layout";
import Auth from "./pages/Auth";
import { Navigate, Route, Routes } from "react-router-dom";
import Task from "./pages/task/Task";
import Dashboard from "./pages/dashboard/Dashboard";

const SecureRoute = ({ redirectPath = "/login", children }) => {
  if (!localStorage.getItem("token")) {
    ("");
    return <Navigate to={redirectPath} replace />;
  }
  return children;
};

const App = () => {
  return (
    <Layout>
      <Routes>
        
        <Route exact path="/login" element={<Auth render="login" />} />
        <Route exact path="/register" element={<Auth render="register" />} />  
        
        <Route
          exact
          path="/"
          element={
            <SecureRoute>
              <Dashboard />
            </SecureRoute>
          }
        />
        <Route
          exact
          path="/task"
          element={
            <SecureRoute>
              <Task />
            </SecureRoute>
          }
        />
      </Routes>

    </Layout>
  );
};

export default App;

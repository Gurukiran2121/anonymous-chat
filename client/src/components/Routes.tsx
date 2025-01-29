import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import LogIn from "../pages/login/LogIn";
import SignUp from "../pages/signup/SignUp";
import ChatPage from "../pages/chatInterface/ChatPage";
import { useAppContext } from "../appContext/AppContext";

const AppRoutes: React.FC = () => {
  const { isAuthenticated, strangers, allUsers } = useAppContext();
  const [userId, setUserId] = useState<string>("");
  const navigate = useNavigate();

  // Fetch all users on mount
  useEffect(() => {
    allUsers();
  }, []);

  // Set first available user ID after fetching
  useEffect(() => {
    if (isAuthenticated && strangers?.length > 0) {
      setUserId(strangers[0]._id);
    }
  }, [isAuthenticated, strangers]);

  // Redirect authenticated users to first chat
  useEffect(() => {
    if (isAuthenticated && userId) {
      navigate(`/${userId}`, { replace: true });
    }
  }, [isAuthenticated, userId, navigate]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          userId ? (
            <Navigate to={`/${userId}`} replace />
          ) : (
            <div>Loading...</div>
          )
        }
      />
      <Route
        path="/:id"
        element={
          isAuthenticated ? (
            <ChatPage strangers={strangers} />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/login"
        element={
          isAuthenticated ? <Navigate to={`/${userId}`} replace /> : <LogIn />
        }
      />
      <Route
        path="/signup"
        element={
          isAuthenticated ? <Navigate to={`/${userId}`} replace /> : <SignUp />
        }
      />
      <Route path="*" element={<Navigate to="/:id" replace />} />
    </Routes>
  );
};

export default AppRoutes;

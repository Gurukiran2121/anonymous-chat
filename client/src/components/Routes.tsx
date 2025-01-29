import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LogIn from "../pages/login/LogIn";
import SignUp from "../pages/signup/SignUp";
import ChatPage from "../pages/chatInterface/ChatPage";
import { useAppContext } from "../appContext/AppContext";
import Conversation from "./Conversation/Conversation";

const AppRoutes: React.FC = () => {
  const { isAuthenticated } = useAppContext();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? <ChatPage /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/" replace /> : <LogIn />}
        />
        <Route
          path="/signup"
          element={isAuthenticated ? <Navigate to="/" replace /> : <SignUp />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;

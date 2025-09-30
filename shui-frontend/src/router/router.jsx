import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import LoginPage from "../pages/LoginPage/LoginPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import MessagesPage from "../pages/MessagesPage/MessagesPage";
import AuthPage from "../pages/AuthPage/AuthPage";

export const router = createBrowserRouter([
  { 
    path : "/",
    element : <HomePage/>
  },
  {
    path : "/auth",
    element : <AuthPage/>
  },
  {
    path : "/auth/register",
    element : <RegisterPage/>
  },
  {
    path : "/messages",
    element : <MessagesPage/>
  }
]);
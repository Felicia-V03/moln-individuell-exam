import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
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
    path : "/messages",
    element : <MessagesPage/>
  }
]);
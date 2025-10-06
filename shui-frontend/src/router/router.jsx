import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import MessagesPage from "../pages/MessagesPage/MessagesPage";
import AuthPage from "../pages/AuthPage/AuthPage";
import AddMessagePage from "../pages/AddMessagePage/AddMessagePage";
import UserMessagesPage from "../pages/UserMessagesPage/UserMessagesPage";
import EditPage from "../pages/EditPage/EditPage";

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
  },
  {
    path : "/message",
    element : <AddMessagePage/>
  },
  {
    path : "/user/:username",
    element : <UserMessagesPage/>
  },
  {
    path : "/edit/:id",
    element : <EditPage/>
  }
]);
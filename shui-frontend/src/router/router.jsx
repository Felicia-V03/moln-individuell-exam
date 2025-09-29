import { createBrowserRouter, RouterProvider } from "react-router-dom";

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
    element : <MessagePage/>
  }
]);
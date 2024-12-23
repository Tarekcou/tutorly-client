import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import ErrorPage from "../pages/ErrorPage";
import AddTutorials from "../pages/AddTutorials";
import MyTutorials from "../pages/MyTutorials";
import BookedTutorials from "../pages/BookedTutorials";
import FindTutors from "../pages/FIndTutors";
import ContactPage from "../pages/ContactPage";
import GetStartedPage from "../pages/GetStartedPage";
import TutorList from "../pages/TutorList";
import LogInPage from "../pages/LogInPage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import SignUpPage from "../pages/SignUpPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      // Add your routes here
      { path: "/", element: <Home /> },
      { path: "/findTutors", element: <TutorList /> },
      { path: "/addTutorials", element: <AddTutorials /> },
      { path: "/myTutorials", element: <MyTutorials /> },
      { path: "/bookedTutorials", element: <BookedTutorials /> },
      { path: "/login", element: <LogInPage /> },
      { path: "/signUp", element: <SignUpPage /> },
      { path: "/forgot-password", element: <ForgotPasswordPage /> },
      { path: "/contact", element: <ContactPage /> },
      {
        path: "/find-tutors/:category",
        element: <TutorList />,
      },
    ],
  },

  {
    path: "*",
    element: <ErrorPage status={404} />,
  },
]);
export default router;

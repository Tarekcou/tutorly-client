import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import ErrorPage from "../pages/ErrorPage";
import AddTutorials from "../pages/AddTutorials";
import MyTutorials from "../pages/MyTutorials";
import ContactPage from "../pages/ContactPage";
import GetStartedPage from "../pages/GetStartedPage";
import LogInPage from "../pages/LogInPage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import SignUpPage from "../pages/SignUpPage";
import TutorDetailsPage from "../pages/TutorDetailsPage";
import MyBookedTutor from "../pages/MyBookedTutor";
import UpdateTutorials from "../pages/UpdateTutorials";
import FindAllTutors from "../pages/AllTutor/FindAllTutors";
import PrivateRouter from "./PrivateRouter";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      // Add your routes here
      { path: "/", element: <Home /> },
      {
        path: "/find-tutors",
        element: <FindAllTutors />,
        loader: async () => {
          const res = await fetch("http://localhost:5005/tutorials");
          const data = await res.json();
          console.log(data);
          return data;
        },
      },
      {
        path: "/find-tutors/:language",
        element: <FindAllTutors />,
        loader: async ({ params }) => {
          console.log(params);
          const res = await fetch(
            `http://localhost:5005/tutorials/${params.language}`
          );
          const data = await res.json();
          // console.log(data);
          return data;
        },
      },
      {
        path: "/tutor/details",
        element: (
          <PrivateRouter>
            <TutorDetailsPage />
          </PrivateRouter>
        ),
      },
      {
        path: "/addTutorials",
        element: (
          <PrivateRouter>
            <AddTutorials />
          </PrivateRouter>
        ),
      },
      {
        path: "/updateTutorials/:id",
        element: (
          <PrivateRouter>
            <UpdateTutorials />
          </PrivateRouter>
        ),
      },
      {
        path: "/myTutorials/:myEmail",
        element: (
          <PrivateRouter>
            <MyTutorials />
          </PrivateRouter>
        ),
        loader: async ({ params }) => {
          // console.log(params);
          const res = await fetch(
            `http://localhost:5005/myTutorials/${params.myEmail}`
          );
          const data = await res.json();
          console.log(data);

          return data;
        },
      },
      {
        path: "/booked-tutors/:myEmail",
        element: (
          <PrivateRouter>
            <MyBookedTutor />
          </PrivateRouter>
        ),
        loader: async ({ params }) => {
          console.log(params);
          const res = await fetch(
            `http://localhost:5005/booked-tutors/${params.myEmail}`
          );
          const data = await res.json();
          return data;
        },
      },
      { path: "/login", element: <LogInPage /> },
      { path: "/signUp", element: <SignUpPage /> },
      { path: "/forgot-password", element: <ForgotPasswordPage /> },
      { path: "/contact", element: <ContactPage /> },
    ],
  },

  {
    path: "*",
    element: <ErrorPage status={404} />,
  },
]);
export default router;

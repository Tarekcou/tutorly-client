import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import ErrorPage from "../pages/ErrorPage";
import AddTutorials from "../pages/Dashboard/AddTutorials";
import MyTutorials from "../pages/Dashboard/MyTutorials";
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
import BecomeTutor from "../components/BecomeTutor";
import BecomeTutorPage from "../pages/BecomeTutorPage";
import Dashboard from "../pages/Dashboard/Dashboard";
import BecomeTutorForm from "../pages/BecomeTutorForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      // Add your routes here
      {
        path: "/",
        element: <Home />,
        // loader: async () => {
        //   const res = await fetch(
        //     "https://tutor-booking-server-olive.vercel.app/tutorials"
        //   );
        //   const data = await res.json();
        //   // console.log(data);
        //   return data;
        // },
      },
      {
        path: "/find-tutors",
        element: <FindAllTutors />,
        // loader: async () => {
        //   const res = await fetch(
        //     "https://tutor-booking-server-olive.vercel.app/tutorials"
        //   );
        //   const data = await res.json();
        //   // console.log(data);
        //   return data;
        // },
      },
      {
        path: "/find-tutors/get-started",
        element: <GetStartedPage />,
      },
      {
        path: "/find-tutors/:language",
        element: <FindAllTutors />,
        loader: async ({ params }) => {
          console.log(params);
          const res = await fetch(
            `https://tutor-booking-server-olive.vercel.app/tutorials/${params.language}`
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
      },
      {
        path: "/become-tutor",
        element: (
          <PrivateRouter>
            <BecomeTutorPage />
          </PrivateRouter>
        ),
      },
      {
        path: "/become-tutor-form",
        element: (
          <PrivateRouter>
            <BecomeTutorForm />
          </PrivateRouter>
        ),
      },

      {
        path: "/booked-tutors/:myEmail",
        element: (
          <PrivateRouter>
            <MyBookedTutor />
          </PrivateRouter>
        ),
      },
      { path: "/login", element: <LogInPage /> },
      { path: "/signUp", element: <SignUpPage /> },
      { path: "/forgot-password", element: <ForgotPasswordPage /> },
      { path: "/contact", element: <ContactPage /> },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRouter>
        <Dashboard />
      </PrivateRouter>
    ),
  },
  {
    path: "/admin-dashboard",
    element: (
      <PrivateRouter>
        <Dashboard />
      </PrivateRouter>
    ),
  },

  {
    path: "*",
    element: <ErrorPage status={404} />,
  },
]);
export default router;

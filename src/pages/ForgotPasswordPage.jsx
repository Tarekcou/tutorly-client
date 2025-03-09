// ForgotPasswordPage.js
import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom"; // For URL params and navigation
import { AuthContext } from "../provider/AuthProvider";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { ToastContainer, toast } from "react-toastify";
import Loading from "../components/Loading";
import "react-toastify/dist/ReactToastify.css";

const ForgotPasswordPage = () => {
  const location = useLocation();
  const { isLoading, passwordReset } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");

  location.state;
  useEffect(() => {
    if (location.state?.email) setEmail(location.state.email);
  }, [location]);

  const handleResetPassword = (e) => {
    e.preventDefault();
    email;

    passwordReset(email)
      .then(() => {
        toast.success("Password reset link send to the Mail");
        window.location.href = "https://mail.google.com";
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error("Opps!! " + errorMessage);

        // ..
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="shadow-lg p-8 rounded-lg w-11/12 md:w-8/12 lg:w-6/12">
            <h2 className="font-bold text-green-700 text-3xl text-center">
              Reset Password
            </h2>
            <form onSubmit={handleResetPassword} className="mt-6">
              <div className="mb-4">
                <label htmlFor="email" className="block">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={location.state?.email ? location.state.email : email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-500 w-full"
                />
              </div>

              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg focus:outline-none w-full text-white"
              >
                Reset
              </button>
            </form>

            <ToastContainer />
          </div>
        </>
      )}
    </div>
  );
};

export default ForgotPasswordPage;

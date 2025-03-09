import React, { useContext, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa6";
import MainLayout from "../layout/MainLayout";
import toast from "react-hot-toast";
import useAxiosPublic from "../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const LogInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signedIn, setUser, user, setLoading, isLoading, googleLogin } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const [err, setErr] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const axiosPublic = useAxiosPublic();

  const location = useLocation();
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    // Add your login logic here
    // ("Login details:", { email, password });

    signedIn(email, password)
      .then((userCredential) => {
        Swal.fire({
          title: "Login successful",
          text: "Congratulations",
          icon: "success",
        });
        // Signed in
        if (location?.state) navigate(location?.state);
        else {
          navigate("/");
        }
        const user = userCredential.user;
        setUser(user);
        setLoading(false);

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setLoading(false);
        setErr(errorMessage);
        // (error.)
        toast.error("something went wrong" + error);
      });
  };

  const handleGoogleLogin = () => {
    googleLogin()
      .then((result) => {
        const userInfo = {
          email: result.user?.email,
          name: result.user?.displayName,
          isAdmin: false,
        };
        axiosPublic.post("/users", userInfo).then((res) => {
          Swal.fire({
            title: "Sign up successful",
            text: "Congratulations",
            icon: "success",
          });
          if (location?.state) navigate(location?.state);
          else {
            // console.log(location);
            navigate("/");
          }
        });

        const user = result.user;
        setUser(user);

        setLoading(false);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  // FOrgot pass
  const history = useLocation(); // For navigation to the forgot password page

  const handleForgotPasswordClick = () => {
    // Redirect to forgot password page with email as a query param
    // history.push(`/forgot-password?email=${email}`);
  };
  // ✅ Set predefined admin/tutor credentials
  const fillAdminCredentials = () => {
    setEmail("admin@gmail.com");
    setPassword("Admin@123");
  };

  const fillTutorCredentials = () => {
    setEmail("tutor@gmail.com");
    setPassword("Tutor@123");
  };

  return (
    <div className="flex justify-center items-center mt-10 min-h-screen">
      {isLoading ? (
        <Loading />
      ) : (
        <div className="bg-white shadow-lg p-8 py-16 rounded-lg w-11/12 md:w-8/12 lg:w-6/12 h-full">
          <h2 className="font-bold text-green-600 text-3xl text-center">
            Login
          </h2>
          <form onSubmit={handleLogin} className="mt-6">
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-500 w-full"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="mt-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-500 w-full"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="top-2 right-3 absolute inset-y-0 flex items-center text-gray-600 hover:text-blue-500"
                >
                  {showPassword ? (
                    <span>
                      <FaEyeSlash />
                    </span> // Replace with an icon like FontAwesome or Heroicons
                  ) : (
                    <span>
                      <FaEye />
                    </span> // Replace with an icon
                  )}
                </button>
              </div>
            </div>
            {/* FOrgo pass */}
            <Link state={{ email: email }} to={`/forgot-password/`}>
              <p
                onClick={handleForgotPasswordClick}
                className="my-3 text-sm underline cursor-pointer"
              >
                {" "}
                Forgot Password?
              </p>
            </Link>

            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-lg focus:outline-none w-full text-white"
            >
              Login
            </button>
          </form>
          {/* ✅ Admin & Tutor Credential Buttons */}
          <div className="flex justify-center gap-4 my-4">
            <button
              onClick={fillAdminCredentials}
              className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg text-white"
            >
              Admin Credential
            </button>
            <button
              onClick={fillTutorCredentials}
              className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg text-white"
            >
              Tutor Credential
            </button>
          </div>
          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-grow border-gray-300 border-t"></div>
            <span className="mx-4 text-gray-500">OR</span>
            <div className="flex-grow border-gray-300 border-t"></div>
          </div>
          <button
            onClick={handleGoogleLogin}
            type="submit"
            className="flex justify-center items-center gap-2 hover:bg-gray-100 my-2 px-4 py-2 rounded-lg btn-outline focus:outline-none w-full text-black hover:text-orange-500 cursor-pointer btn"
          >
            <FaGoogle className="text-blue-600" /> Continue with Google
          </button>
          <p className="mt-4 text-gray-600 text-sm text-center">
            Don't have an account?{" "}
            <a href="/signUp" className="text-blue-600 hover:underline">
              Register here
            </a>
          </p>

          {err ? (
            <h1 className="text-red-500 text-center">
              Can't Login Check Email or Password {err}
            </h1>
          ) : (
            ""
          )}
        </div>
      )}
    </div>
  );
};

export default LogInPage;

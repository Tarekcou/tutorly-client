import React, { useContext, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import { FaEyeSlash, FaGoogle } from "react-icons/fa6";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye } from "react-icons/fa";
import useAxiosPublic from "../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const SignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [photoUrl, setPhotoUrl] = useState("");
  const axiosPublic = useAxiosPublic();
  const location = useLocation(); // ✅ Get location object

  const {
    isLoading,
    setLoading,
    registerWithEmail,
    updateUserProfile,
    setUser,
    setimageKey,
    googleLogin,
  } = useContext(AuthContext);
  const [errMessage, setErrorMessage] = useState({
    name: "",
    email: "",
    password: "",
    photoUrl: "",
  });
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage({});

    /^(?=.*[a-z])(?=.*[A-Z])(?=.{6,})/.test(password);
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.{6,})/.test(password)) {
      setErrorMessage({
        ...errMessage,
        password: (
          <ul className="py-2 pl-5 list-disc">
            <li>Must have an Uppercase letter in the password </li>
            <li> Must have a Lowercase letter in the password </li>{" "}
            <li>Length must be at least 6 character</li>
          </ul>
        ),
      });
      setLoading(false);
      return;
    }

    registerWithEmail(email, password)
      .then((userCredential) => {
        // toast("Register is processing..");
        // Signed up
        const user = userCredential.user;
        setLoading(false);
        setUser(user);

        updateUserProfile(name, photoUrl).then(() => {
          const userInfo = {
            name,
            email,
            isAdmin: false,
          };
          axiosPublic.post("/users", userInfo).then((res) => {
            if (res.status === 200) {
              Swal.fire({
                title: "Sign up successful",
                text: "Congratulations",
                icon: "success",
              });
              if (location.state) {
                navigate(location.state);
              } else {
                navigate("/");
              }
            }
          });
        });
      })

      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage({
          ...errMessage,
          submitError: errorMessage + "Error submit Registration Information",
        });
        setLoading(false);
        // ..
      });
  };

  const handleGoogleLogin = () => {
    googleLogin()
      .then((result) => {
        if (!result || !result.user) {
          throw new Error("Google login failed. No user data found.");
        }

        console.log(result);
        const userInfo = {
          email: result.user.email || "No Email",
          name: result.user.displayName || "No Name",
          isAdmin: false,
        };

        axiosPublic.post("/users", userInfo).then((res) => {
          if (res.status === 200) {
            Swal.fire({
              title: "Sign up successful",
              text: "Congratulations",
              icon: "success",
            });
            if (location?.state) navigate(location.state);
            else navigate("/");
          }
        });

        setUser(result.user);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Google login error:", error.message);
        Swal.fire({
          title: "Login Failed",
          text: error.message,
          icon: "error",
        });
        setLoading(false);
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="shadow-lg mt-20 p-8 rounded-lg w-11/12 md:w-8/12 lg:w-6/12">
            <h2 className="font-bold text-green-700 text-3xl text-center">
              Register
            </h2>
            <form onSubmit={handleRegister} className="mt-6">
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="mt-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-500 w-full"
                />
                {errMessage.name && (
                  <label className="text-red-600 text-xs">
                    {errMessage.name}
                  </label>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="signUpEmail"
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
                    className="relative mt-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-500 w-full"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="top-5 right-3 absolute flex items-center text-gray-600 hover:text-blue-500"
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
                  {errMessage.password && (
                    <label className="text-red-600 text-xs">
                      {errMessage.password}
                    </label>
                  )}
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-gray-700">
                  Photo Url
                </label>
                <input
                  type="photoUrl"
                  id="photoUrl"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  required
                  className="mt-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-500 w-full"
                />
              </div>
              <button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-lg focus:outline-none w-full text-white"
              >
                Sign Up
              </button>
            </form>
            {/* Divider */}
            <div className="flex items-center my-6">
              <div className="flex-grow border-gray-300 border-t"></div>
              <span className="mx-4 text-gray-500">OR</span>
              <div className="flex-grow border-gray-300 border-t"></div>
            </div>
            <button
              onClick={handleGoogleLogin}
              type="submit"
              className="flex justify-center items-center gap-2 btn-outline w-full cursor-pointer btn"
            >
              <FaGoogle className="text-green-500" /> Continue with Google
            </button>

            <p className="mt-4 text-gray-600 text-sm text-center">
              Already have an account?{" "}
              <a href="/login" className="text-blue-600 hover:underline">
                Login here
              </a>
            </p>

            {errMessage.submitError && (
              <h1 className="text-red-500 text-center">
                {errMessage.submitError}
              </h1>
            )}
          </div>
        </>
      )}
      <ToastContainer autoClose={2000} />
    </div>
  );
};

export default SignUpPage;

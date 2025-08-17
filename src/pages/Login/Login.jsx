import React, { useState } from "react";
import { FaEyeSlash } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/images/humanity.png";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/api/auth/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success("Login successful! Redirecting...");
        // Store token if your API returns one
        if (data?.data?.token) {
          localStorage.setItem("token", data?.data?.token);
            localStorage.setItem("role", data?.data?.user?.role);
             localStorage.setItem("userId", data?.data?.user?._id);
        }
        // Redirect after 2 seconds
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      } else {
        toast.error(data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#f9fafb] h-screen">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="flex justify-center py-8">
        <img className="w-[80px] md:w-[100px]" src={Logo} alt="" />
      </div>
      <form className="flex justify-center page-width" onSubmit={handleSubmit}>
        <div className="bg-[white] p-8 shadow-lg rounded-lg md:w-1/3">
          <h2 className="login-heading">Log in to your account</h2>
          <p style={{ fontWeight: 600 }} className="login-label pt-10 pb-2">
            Email address
          </p>
          <input
            className="p-3 w-full bg-[#f6f7f9] border rounded-xl outline-none"
            placeholder="ex@mail.com"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          
          <p style={{ fontWeight: 600 }} className="login-label pt-5 pb-2">
            Password
          </p>
          <div className="relative">
            <input
              className="p-3 border bg-[#f6f7f9] w-full rounded-xl outline-none"
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span onClick={togglePassword}>
              {showPassword ? (
                <MdOutlineRemoveRedEye
                  className="text-[#C1C1C5] absolute right-5 top-4 cursor-pointer"
                  size={20}
                />
              ) : (
                <FaEyeSlash
                  className="text-[#C1C1C5] absolute right-5 top-4 cursor-pointer"
                  size={20}
                />
              )}
            </span>
          </div>

          <div className="flex justify-center gap-1 mt-10">
            <button
              type="submit"
              className="px-8 pt-3 pb-2 w-full rounded-md bg-[#006679] login-btn hover:bg-[#268394] focus:outline-none disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Log in"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
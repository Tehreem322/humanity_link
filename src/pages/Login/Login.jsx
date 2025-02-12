import React, { useState } from "react";
import { FaEyeSlash } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import Logo from "../../assets/images/logo.svg";
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="bg-[#f9fafb] h-screen">
      <div className="flex justify-center py-8">
        <img className="w-[80px] md:w-[100px]" src={Logo} alt="" />
      </div>
      <form className="flex justify-center page-width">
        <div className="bg-[white] p-8 shadow-lg rounded-lg md:w-1/3">
          <h2 className="login-heading">Log in to your account</h2>
          <p
            style={{ fontWeight: 600 }}
            className="login-label pt-10 pb-2"
          >
            Email address
          </p>
          <input
            className="p-3 w-full bg-[#f6f7f9] border rounded-xl outline-none"
            placeholder="ex@mail.com"
            type="email"
            autoComplete="current-password"
          />
           <p
            style={{ fontWeight: 600 }}
            className="login-label pt-10 pb-2"
          >
            phone no
          </p>
          <input
            className="p-3 w-full bg-[#f6f7f9] border rounded-xl outline-none"
            placeholder="ex@mail.com"
            type="email"
            autoComplete="current-password"
          />
<p
            style={{ fontWeight: 600 }}
            className="login-label pt-5 pb-2"
          >
            Password
          </p>
          <div className="relative">
            <input
              className="p-3 border bg-[#f6f7f9] w-full rounded-xl outline-none"
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
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
            <button className="px-8 pt-3 pb-2 w-full rounded-md bg-[#006679] login-btn hover:bg-[#268394] focus:outline-none">
              Log in
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;

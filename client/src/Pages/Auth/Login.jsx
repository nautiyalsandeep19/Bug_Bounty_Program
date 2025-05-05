import React, { useState } from "react";
import { Link } from "react-router";

const Tab = ({ tabData, field, setField }) => {
  return (
    <div className="flex bg-gray-800 p-1 gap-x-1 my-6 rounded-full w-fit cursor-pointer shadow-inner">
      {tabData.map((tab) => (
        <div
          key={tab?.id}
          onClick={() => setField(tab.tabName)}
          className={`${
            field === tab.tabName
              ? "bg-blue-600 text-white"
              : "bg-transparent text-gray-300"
          } py-2 px-6 rounded-full transition-colors duration-300 text-sm font-medium`}
        >
          {tab?.tabName}
        </div>
      ))}
    </div>
  );
};

const Login = () => {
  const [userType, setUserType] = useState("hacker");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const tabData = [
    { id: 1, tabName: "hacker" },
    { id: 2, tabName: "company" },
  ];

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Replace with actual login handler
    console.log("Login with:", { ...formData, userType });
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto bg-gray-900 p-8 rounded-xl shadow-lg text-white mt-16">
      <h2 className="text-3xl font-semibold">Login</h2>

      {/* Tabs */}
      <Tab tabData={tabData} field={userType} setField={setUserType} />

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col w-full gap-5">
        {/* Email */}
        <div>
          <label className="text-sm font-semibold text-gray-300">
            Email <sup className="text-red-500">*</sup>
          </label>
          <input
            required
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full mt-1 p-3 bg-gray-800 text-gray-200 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Password */}
        <div>
          <label className="text-sm font-semibold text-gray-300">
            Password <sup className="text-red-500">*</sup>
          </label>
          <input
            required
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            placeholder="Enter your password"
            className="w-full mt-1 p-3 bg-gray-800 text-gray-200 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="text-right mt-2">
            <Link
              to="/forgot-password"
              className="text-sm text-blue-400 hover:underline transition-all duration-200"
            >
              Forgot password?
            </Link>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all duration-200"
        >
          Login
        </button>

        {/* Signup link */}
        <p className="text-center text-sm text-gray-400 mt-3">
          New here?{" "}
          <Link
            to="/signup"
            className="text-blue-400 hover:underline transition-all duration-200"
          >
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;

import React from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    // simulate login success
    navigate("/profile/details");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Login Page</h1>
      <button 
        onClick={handleLogin}
        className="bg-black text-white px-4 py-2 rounded"
      >
        Log In
      </button>
    </div>
  );
}

export default Login;
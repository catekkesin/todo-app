import React from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";

const Home = () => {
  const { user, logout } = UserAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
      console.log("You are logged out");
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold py-4">Account</h1>
      <p>User Email: {user.email}</p>

      <button onClick={handleLogout} className="border px-6 py-2 my-4">
        Logout
      </button>
    </>
  );
};

export default Home;

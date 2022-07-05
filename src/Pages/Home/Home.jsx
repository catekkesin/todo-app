import React from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";

const Home = () => {
  const { user } = UserAuth();
  const navigate = useNavigate();

  return (
    <>
      <h1 className="text-2xl font-bold py-4">Account</h1>
      <p>User Email: {user.email}</p>
    </>
  );
};

export default Home;

import React, { useState } from "react";

import { useAuth } from "../context/AuthContext"; // Import useAuth
import { useNavigate } from "react-router-dom";
import { loginArr } from "../interface/loginInterface";
import Swal from "sweetalert2";
import LoginForm from "./LoginForm";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { login } = useAuth(); // Use the login function from context
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Entered Email:", email);
    console.log("Entered Password:", password);
    //should be get user or something or use login fetch 
    const paramater : loginArr = {
      email         :  email,
      password      :  password,
    };

    login(paramater)
    .then(function(data)
    {
      console.log(data);
      const storedToken = localStorage.getItem("authToken");
      console.log("Token:", storedToken); 

      if (storedToken) {
        console.log("Login successful, redirecting...");
        navigate("/"); 

      } else {
        Swal.fire("ERROR!  ", "No registered user found", "error");

      }
    }).catch(function(error){
       alert(error);
       navigate("/register");
    })
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded shadow-md">
        <LoginForm
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default Login;

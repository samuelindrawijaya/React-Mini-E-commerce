import React, { useState } from "react";
import LoginForm from "./LoginForm";
import { useAuth } from "../context/AuthContext"; // Import useAuth
import { useNavigate } from "react-router-dom";
import { loginArr } from "../interface/loginInterface";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rememberme, setRememberme] = useState<boolean>(false);
  const { login } = useAuth(); // Use the login function from context
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Entered Email:", email);
    console.log("Entered Password:", password);
    console.log("Entered checked:", rememberme);
    //should be get user or something or use login fetch 
    const paramater : loginArr = {
      email         :  email,
      password      :  password,
      rememberme    :  rememberme,
    };

    login(paramater)
    .then(function(data)
    {
      console.log(data);
      const storedToken = localStorage.getItem("authToken");
      console.log("Token:", storedToken); 

      if (storedToken) {
        console.log("Login successful, redirecting...");
        navigate("/categorylist"); // Redirect to the todos page

      } else {

        alert("No registered user found");
        navigate("/register");

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
          setRememberme={setRememberme}
          rememberme={rememberme}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default Login;

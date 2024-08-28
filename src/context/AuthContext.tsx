// src/AuthContext.tsx
import React, { createContext, useState, useContext, ReactNode } from "react";
import Login from "../component/Login";
import { loginArr } from "../interface/loginInterface";

interface AuthContextType {
  isAuthenticated: boolean;
  login: ({email, password} : loginArr) => Promise<loginArr[]> ;
  logout: () => void;
  register: (email: string, password: string) => void; // Add register function
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => 
{
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem("authToken");
  });
  //set user here !!!!! so you can show the profile one !!!
  const login = async({ email, password, rememberme } : loginArr ) : Promise<loginArr[]> => {
    if(email)
    {
      alert(rememberme);
      localStorage.setItem("rememberedEmail", email);
    }


    try
    {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
            password: password,
        })
      }) /*end fetch */;
      if(!response.ok)
      {
        setIsAuthenticated(false);
        throw new Error(await response.json());
       
      }
      else
      {
        const data = await response.json();
        localStorage.setItem("authToken", JSON.stringify(data.accessToken));
        setIsAuthenticated(true);
        return data;
      }
    }
    catch (error: unknown) 
    {   
        if (error instanceof Error) {
            alert(error.message);
        } else {
            alert('An unknown error occurred');
        }
        return [];	
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("authToken");
  };

  const register = (email: string, password: string) => {
    const userData = { email, password };
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("authToken", "some-auth-token"); // Fake auth token for demonstration
    <Login/>
    };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

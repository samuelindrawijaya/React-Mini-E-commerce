// src/AuthContext.tsx
import React, { createContext, useState, useContext, ReactNode } from "react";
import Login from "../component/Login";
import { loginArr } from "../interface/loginInterface";
import Swal from "sweetalert2";

interface AuthContextType {
  isAuthenticated: boolean;
  login: ({email, password} : loginArr) => Promise<loginArr[]> ;
  logout: () => void;
  register: (email: string, password: string) => void;
  fetchWithBearerToken: (url: string, token: string) => void; // Add register function
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
  const login = async({ email, password } : loginArr ) : Promise<loginArr[]> => {
    if(email)
    {
      //localStorage.setItem("rememberedEmail", email);
    }


    try
    {
      const response = await fetch('https://api.escuelajs.co/api/v1/auth/login', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
            password: password,
        })
      }) 
      if(!response.ok)
      {
        setIsAuthenticated(false);
        throw new Error(await response.json());
       
      }
      else
      {
        const data = await response.json();
        localStorage.setItem("authToken", JSON.stringify(data.access_token));
        setIsAuthenticated(true);
        return data;
      }
    }
    catch (error: unknown) 
    {   

        console.log(error);
        if (error instanceof Error) {
            Swal.fire("ERROR!  ", error.message, "error");
        } else {
            Swal.fire("ERROR!  ", "An unknown error occurred !!", "error");
        }
        return [];	
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("authToken");
    
  };

  const fetchWithBearerToken = async (url : string, token : string) => {
    try {
      const response = await fetch(url, {
        method: 'GET', // You can use POST, PUT, DELETE, etc. depending on your needs
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
  
      if (!response.ok) {
        Swal.fire("ERROR!  ", 'Network response was not ok', "error");
      }
  
      const data = await response.json();
      localStorage.setItem("imgUser", JSON.stringify(data.avatar));
    } catch (error) {
      Swal.fire("ERROR!  ", 'Something bad happen !!', "error");
     
    }
  };

  const register = (email: string, password: string) => {
    const userData = { email, password };
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("authToken", "some-auth-token"); // Fake auth token for demonstration
    <Login/>
    };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, register,fetchWithBearerToken }}>
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

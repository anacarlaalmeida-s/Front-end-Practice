import { createContext, useState } from "react";

const Context = createContext();

function AuthProvider({ children }) {
  const [token, setToken] = useState('');
  const [erro, setErro]= useState('');
  const baseURL="https://cubos-api-contacts.herokuapp.com";
  
  const setUserSession = (token) => {
    localStorage.setItem("token", JSON.stringify(token));
    setToken(token);
  };

  const removeUserSession = () => {
    localStorage.removeItem("token");
    setToken("")
  };

  return (
    <Context.Provider value={{ baseURL, token, setToken, erro, setErro, setUserSession, removeUserSession }}>
      {children}
    </Context.Provider>
  );
}
export { Context, AuthProvider };

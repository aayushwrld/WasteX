import React, { createContext, useState } from "react";
import { loginCheck } from "../utils/loginCheck";

export const AppContext = createContext();

const ParentContext = ({ children }) => {
  const [category, setCategory] = useState();
  const [login,setLogin] = useState(loginCheck())
  return (
    <AppContext.Provider
      value={{
        category,
        setCategory,
        login,
        setLogin
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default ParentContext;

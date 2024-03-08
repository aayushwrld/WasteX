import React from "react";
import AllRoutes from "./components/Routes/AllRoutes";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div className="container">
      <Navbar />
      <AllRoutes />
    </div>
  );
};

export default App;

import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "./routes/Auth";
import Friends from "./routes/Friends";

function AppRouter({ isLoggedIn }) {
  return (
    <Router>
        
      <Routes>
      {!isLoggedIn && <Route exact path="/" element={<Auth />} />}
      </Routes>
    </Router>
  );
}

export default AppRouter;

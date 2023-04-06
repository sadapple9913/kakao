import React, { useState } from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./routers/Home";
import Profiles from "./routers/Profiles";
import Auth from "./components/Auth";

function AppRouter({ isLoggedIn,userObj }) {



  console.log({userObj})
  ;
  return (
    <Router>
      {isLoggedIn && <Navigation />}
      <Routes>
        {isLoggedIn ? (
          <>
            <Route exact path="/" element={<Home userObj={userObj} />} />
            <Route esact path="/Profiles" element={<Profiles />} />
          </>
        ) : (
          <Route exact path="/" element={<Auth />} />
        )}
      </Routes>
    </Router>
  );
}

export default AppRouter;

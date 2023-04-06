import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Chats from "./routes/Chats";
import Find from "./routes/Find";
import More from "./routes/More";
import Profile from "./routes/Profile";
import Chatting from "./routes/Chatting";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Auth from "./routes/Auth";
import Friends from "./routes/Friends";
import My from "./components/My";
import MyProfile from "./routes/MyProfile";
import Edit from "./components/Edit";

function App() {
  const auth = getAuth();
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState('');


  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserObj(user);

      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  });

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        {isLoggedIn ? (
          <>
            <Route exact path="/" element={<Friends userObj={userObj} />} />
          </>
        ) : (
          <Route exact path="/" element={<Auth />} />
        )}
        <Route path="/Chats" element={<Chats />} />
        <Route path="/Find" element={<Find />} />
        <Route path="/More" element={<More userObj={userObj} />} />
        <Route path="/Profile" element={<Profile userObj={userObj} />} />
        <Route path="/MyProfile" element={<MyProfile userObj={userObj} />} />
        <Route path="/profile/:id" component={Profile} />
        <Route path="/Chatting" element={<Chatting isLoggedIn={isLoggedIn} userObj={userObj}/>} />
        <Route path="/My" element={<My userObj={userObj} /> } />
        <Route path="/Edit" element={<Edit userObj={userObj} /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

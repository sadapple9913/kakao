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
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { faFontAwesome } from '@fortawesome/free-brands-svg-icons'
import ChatList from "./components/ChatList";


library.add(fas, faFontAwesome,)


function App() {
  const auth = getAuth();
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState('');
  const [name, setName] = useState('');


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
        <Route path="/Chats" element={<Chats userObj={userObj} />} />
        <Route path="/Find" element={<Find />} />
        <Route path="/More" element={<More userObj={userObj} />} />
        <Route path="/Profile" element={<Profile userObj={userObj} />} />
        <Route path="/MyProfile" element={<MyProfile userObj={userObj} />} />
        <Route path="/profile/:id" component={Profile} />
        <Route path="/Chatting" element={<Chatting isLoggedIn={isLoggedIn} userObj={userObj}/>} />
<<<<<<< HEAD
=======
        {/* <Route path="/My" element={<My userObj={userObj} /> } /> */}
>>>>>>> 1a7ef9dc5de98dd8bf42dfab5ef3b65dafd5134d
        <Route path="/Edit" element={<Edit userObj={userObj} /> } />
        <Route path="/ChatList" element={<ChatList  userObj={userObj}/> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Friends from './routes/Friends'
import Chats from './routes/Chats';
import Find from './routes/Find'
import More from './routes/More';
import Profile from './routes/Profile';
import Chatting from './routes/Chatting';
import Auth from './components/Auth';
;
// import Tab from './components/Tab'



function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
    <Routes>
      <Route path='/' element={<Auth />}/>
      <Route path='/Friends' element={<Friends />}/>
      <Route path='/Chats' element={<Chats/>}/>
      <Route path='/Find' element={<Find /> }/>
      <Route path='/More' element={<More /> }/>
      <Route path='/Profile' element={<Profile /> }/>
      <Route path="/profile/:id" component={Profile} />
      <Route path='/Chatting' element={<Chatting /> }/>
    </Routes>
    </BrowserRouter> 
  )
}
export default App;

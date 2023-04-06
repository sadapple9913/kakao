import React, { useState } from "react";
import {
signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
} from "firebase/auth";
import '../fbase'
import '../styles/Auth.scss'


function Auth() {
  const auth = getAuth()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccout, setNewAccount] = useState(true);
  const [error, setError] = useState("");
  const onChange = (e) => {
    const {
      target: { name, value },
    } = e;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      let data;
      if (newAccout) {
        data = createUserWithEmailAndPassword(auth, email, password);
      } else {
        data = signInWithEmailAndPassword(auth, email, password);
      }
      console.log(data);
    } catch (error) {
      setError(error.message);
    }
  };
  const toggleAccount = () => setNewAccount((prev) => !prev);
  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event;
    let provider;
    if (name === "Google") {
      provider = new GoogleAuthProvider();
    }
    const data = await signInWithPopup(auth, provider);
    console.log(data);
  };
  return (
    <div className="background">
    <div className="image">
      <form onSubmit={onSubmit} className="Login">
        <input className="email"
          name="email"
          type="text"
          placeholder="Email"
          required
          value={email}
          onChange={onChange}
        />
        <input className="password"
          name="password"
          type="password"
          placeholder="password"
          required
          value={password}
          onChange={onChange}
        />
        <input className="toggle"  type="submit" value={newAccout ? "회원가입" : "로그인"} />
        {error}
      </form>
      <span onClick={toggleAccount} className="sign">
        {newAccout ? "이미 회원이시라면 여기를" : "회원가입을 하시려면 여기를"}
      </span>
      <div className="googleLogin">
        <div className="another">
          또는
        </div>
        <button onClick={onSocialClick} name="Google">
          Google 로그인~
        </button>
      </div>
    </div>
    </div>
  );
}

export default Auth;

import React, { useState } from "react";
import {getAuth,signInWithEmailAndPassword,createUserWithEmailAndPassword,GoogleAuthProvider,GithubAuthProvider,signInWithPopup,} from "firebase/auth";

function Auth() {
  const auth = getAuth();
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
    } else if (name === "GitHub") {
      provider = new GithubAuthProvider();
    }
    const data = await signInWithPopup(auth, provider);
    console.log(data);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="text"
          placeholder="Email"
          required
          value={email}
          onChange={onChange}
        />
        <input
          name="password"
          type="password"
          placeholder="password"
          required
          value={password}
          onChange={onChange}
        />
        <input type="submit" value={newAccout ? "Create Account" : "Sign In"} />
        {error}
      </form>
      <span onClick={toggleAccount}>
        {newAccout ? "Sign In" : "Create Account"}
      </span>
      <div>
        <button onClick={onSocialClick} name="Google">
          Coutinue wiht Google
        </button>
        <button onClick={onSocialClick} name="GitHub">
          Coutinue wiht GitHub
        </button>
      </div>
    </div>
  );
}

export default Auth;

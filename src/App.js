import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import React, { useState } from 'react';
import { auth, provider } from "./firebase-config";


function App() {

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");


  const handleGoogleLogin = async () => {
    try {
      const user = await signInWithPopup(auth, provider);
      console.log(user);

    } catch (err) {
      console.log(err.message);
    }
  }

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const user = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
      localStorage.setItem("AccessToken", user.user.accessToken);
      window.alert("Registration successful");
      console.log(user);

    } catch (err) {
      console.log(err.message);
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userLogin = await signInWithEmailAndPassword(auth, loginEmail, loginPassword)
      localStorage.setItem("AccessToken", userLogin.user.accessToken);
      localStorage.setItem("Email", userLogin.user.email);
      window.alert("Login successful");
      window.location.reload();

    } catch (err) {
      console.log(err.message);;
    }
  }

  const handleLogout = async () => {
    localStorage.removeItem("AccessToken");
    localStorage.removeItem("Email");
    window.alert("Logout successfully")
    window.location.reload();
  }

  return (
    <div className='bg-gray-200 h-[100vh] flex justify-center font-serif'>
      <div className='flex flex-col justify-center align-middle space-y-10'>
        <p className="text-center text-2xl font-semibold">User Login : {localStorage.getItem("Email")}</p>

        <form className='bg-violet-500 px-20 py-6 rounded-lg space-y-6' onSubmit={handleLogin}>
          <div>
            <p className='text-center text-2xl text-white uppercase'>Login User</p>
          </div>
          <div className='space-y-2 md:space-x-10'>
            <input type="email" value={loginEmail} placeholder="Email" onChange={(e) => setLoginEmail(e.target.value)} className="px-3 py-2 rounded-lg" />
            <input type="password" value={loginPassword} placeholder="Password" onChange={(e) => setLoginPassword(e.target.value)} className="px-3 py-2 rounded-lg" />
          </div>
          <div className='flex justify-center space-x-10'>
            <button type='submit' className='px-10 py-2 bg-yellow-300 rounded-lg'>Login</button>
            <button type='submit' className='px-10 py-2 bg-yellow-300 rounded-lg' onClick={handleLogout}>Logout</button>
          </div>
        </form>

        <form className='bg-violet-500 px-20 py-6 rounded-lg space-y-6' onSubmit={handleRegister}>
          <div>
            <p className='text-center text-2xl text-white uppercase'>Register User</p>
          </div>
          <div className='space-y-2 md:space-x-10'>
            <input type="email" value={registerEmail} placeholder="Email" onChange={(e) => setRegisterEmail(e.target.value)} className="px-3 py-2 rounded-lg" />
            <input type="password" value={registerPassword} placeholder="Password" onChange={(e) => setRegisterPassword(e.target.value)} className="px-3 py-2 rounded-lg" />
          </div>
          <div className='flex justify-center'>
            <button type='submit' className='px-10 py-2 bg-yellow-300 rounded-lg'>Register</button>
          </div>
        </form>

        <div>
          <div onClick={handleGoogleLogin}>
            <button>Google</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import '../App.css';
import done from "../Assets/done.mp3";
import { auth, provider } from '../firebase-config';

function Auth() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [pageType, setPageType] = useState(false);
    const [success, setSuccess] = useState(false);

    const notificationBell = () => {
        new Audio(done).play();
    }

    // Google login user
    const handleGoogleLogin = async () => {
        try {
            const user = await signInWithPopup(auth, provider);
            notificationBell();
            localStorage.setItem("AccessToken", user.user.accessToken);
            localStorage.setItem("Email", user.user.email);
            setSuccess(true);
        } catch (err) {
            console.log(err.message);
        }
    }

    // Register user
    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const user = await createUserWithEmailAndPassword(auth, email, password);
            notificationBell();
            localStorage.setItem("AccessToken", user.user.accessToken);
            window.alert("Registration successful");
        } catch (err) {
            console.log(err.message);
        }
    }

    // Login user
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const userLogin = await signInWithEmailAndPassword(auth, email, password);
            notificationBell();
            localStorage.setItem("AccessToken", userLogin.user.accessToken);
            localStorage.setItem("Email", userLogin.user.email);
            window.alert("Login successful");
            setSuccess(true);
        } catch (err) {
            console.log(err.message);;
        }
    }

    // Logout the user
    const handleLogout = async () => {
        setSuccess(false);
        localStorage.removeItem("AccessToken");
        localStorage.removeItem("Email");
        window.alert("Logout successfully")
        window.location.reload();
    }

    useEffect(() => {
    }, [success]);

    return (
        <div className='w-[100%] h-[140vh] md:h-[100vh] relative parent-container font-serif'>
            <div className='h-1/2 w-full bg-[#3750EB] absolute top-0' />
            <div className='h-1/2 w-full bg-[#C5D4FD] absolute bottom-0' />

            <div className='absolute inset-0 flex items-center justify-center z-50 -top-2'>
                <div className='h-[75%] w-[90%] md:w-[65%] z-50 space-y-6'>
                    <div className='text-center bg-white h-[8%] rounded-3xl flex justify-center items-center'>
                        <p className='font-semibold text-xl'>Authentication template</p>
                    </div>

                    <div className='w-[100%] h-[85%] flex flex-col md:flex-row'>
                        <div className='bg-slate-200 md:w-1/2 h-full rounded-t-3xl md:rounded-t-none md:rounded-tl-[40px] md:rounded-bl-[40px] flex items-center'>
                            <img src={require('../Assets/auth.png')} alt='auth' />
                        </div>
                        {success ?
                            <div className='bg-white md:w-1/2 h-full rounded-b-3xl md:rounded-b-none md:rounded-tr-[40px] md:rounded-br-[40px] flex flex-col justify-center p-10 xl:p-20'>
                                <div>
                                    <p className='text-center text-xl font-semibold'>User login successfully</p>
                                    <p className='text-center text-lg mt-6'>Email : {localStorage.getItem("Email")}</p>
                                    <button className='py-3 rounded-xl bg-blue-600 text-white font-semibold mt-10 w-full' onClick={handleLogout}>Logout</button>
                                </div>
                            </div>
                            :
                            <form onSubmit={pageType ? handleRegister : handleLogin}
                                className='bg-white md:w-1/2 h-full rounded-b-3xl md:rounded-b-none md:rounded-tr-[40px] md:rounded-br-[40px] flex flex-col justify-center p-10 xl:p-24'>
                                <label className='text-slate-400'>Username or email</label>
                                <input type='text' className='bg-slate-200 py-3 px-4 rounded-xl text-base text-slate-500'
                                    onChange={(e) => setEmail(e.target.value)} value={email} />

                                <label className='text-slate-400 mt-5'>Password</label>
                                <div className='flex relative'>
                                    <input type={showPassword ? 'text' : 'password'}
                                        onChange={(e) => setPassword(e.target.value)} value={password}
                                        className='bg-slate-200 py-3 px-4 rounded-xl text-base text-slate-500 w-full' />
                                    <div onClick={() => setShowPassword((prev) => !prev)} className='absolute right-3 top-3 opacity-50'>
                                        {showPassword ?
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                            </svg>
                                            :
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        }
                                    </div>
                                </div>

                                <button className='py-3 rounded-xl bg-blue-600 text-white font-semibold mt-10' type='submit'>{pageType ? 'Register' : 'Login'}</button>
                                <div className='flex relative mt-10' onClick={handleGoogleLogin}>
                                    <button className='py-3 rounded-xl text-black font-semibold w-[100%] border-2 border-black'>Sign in with Google</button>
                                    <img src={require('../Assets/googleLogo.png')} className='w-10 absolute top-1.5 left-4' alt='google' />
                                </div>

                                {pageType ?
                                    <p className='text-sm font-semibold opacity-75 text-center pt-4'>Already have an account?
                                        <span className='cursor-pointer text-blue-600' onClick={() => setPageType((prev) => !prev)}>  Sign In</span></p>
                                    :
                                    <p className='text-sm font-semibold opacity-75 text-center pt-4'>Don't have an account?
                                        <span className='cursor-pointer text-blue-600' onClick={() => setPageType((prev) => !prev)}>  Sign Up</span></p>
                                }
                            </form>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Auth
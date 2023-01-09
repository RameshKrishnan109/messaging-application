import React, { useState } from 'react'
import { IMessage } from '../interfaces/IMessage';
import { apiRequest } from '../utilities/ApiRequests';

export interface ISignInRequest {
  email: string,
  password: string
}

export interface ISignUpRequest {
  username: string,
  email: string,
  password: string
}

const LoginPage = () => {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isSignIn, setIsSignIn] = useState(true);

  const OnSignInClick = () => {
    let body: ISignInRequest = {
      email: email,
      password: password
    }
    apiRequest.post<IMessage>("/login", body).then((res) => {
      console.log(res.message);
    })
  }

  const OnSignUpClick = () => {
    let body: ISignUpRequest = {
      username: username,
      email: email,
      password: password
    }
    apiRequest.post<IMessage>("/register", body).then((res) => {
      console.log(res.message);
    })
  }

  const ResetValues = () => {
    setUsername("");
    setEmail("");
    setPassword("");
  }

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    if (isSignIn) {
      OnSignInClick();
    }else{
      OnSignUpClick();
    }
  }

  return (
    <div className='relative grid place-items-center bg-gray-200 w-screen min-h-screen'>
      <div className='absolute grid place-items-center p-10 bg-gray-100 rounded-lg'>
        <form className='flex flex-col gap-4 w-[400px]' onSubmit={(e)=>{handleSubmit(e)}}>
          {
            !isSignIn && <input type='text' placeholder='Username' className='input-login' onChange={(e) => { setUsername(e.target.value) }} />
          }
          <input type='text' placeholder='Email address' className='input-login' onChange={(e) => { setEmail(e.target.value) }} />

          <input type='password' placeholder='Password' className='input-login' onChange={(e) => { setPassword(e.target.value) }} />

          <a className='self-end text-gray-600 text-[14px] underline cursor-pointer'>Forgot password</a>

          {
            isSignIn && <button className='button mt-2' onClick={(e) => {
              e.preventDefault();
            }}>Sign in</button>
          }

          {
            !isSignIn && <button className='button mt-2' onClick={(e) => {
              e.preventDefault();
             
            }}>Sign Up</button>
          }

          {
            isSignIn && <p className='self-center text-gray-600'>Not a member? <span className='text-primary-color font-semibold cursor-pointer' onClick={() => {
              ResetValues();
              setIsSignIn(false);
            }}>Register now</span></p>
          }

          {
            !isSignIn && <p className='self-center text-gray-600'>Already have an account? <span className='text-primary-color font-semibold cursor-pointer' onClick={() => {
              ResetValues();
              setIsSignIn(true);
            }}>Sign in</span></p>
          }
        </form>
      </div>
    </div>
  )
}

export default LoginPage
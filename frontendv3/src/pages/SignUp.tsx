'use client';

import { Heading } from "@/components/Heading"
import { SubHeading } from "@/components/SubHeading"
import { InputBox } from "@/components/InputBox"
import { Button } from "@/components/Button"
import { BottomWarning } from "@/components/BottomWarning";
import { useState } from "react";
import axios from "axios";
import { useRouter } from 'next/navigation'




export const SignUp = () => {
  const [username, setUsername] = useState('');
  const [firstName, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  return (


    <div className="flex items-center flex-col p-10 bg-slate-50 text-black rounded-md">
        <div className="flex flex-col items-center">
            <Heading label="Sign In" />
            <SubHeading label='Enter your information to create' />
            <SubHeading label='an account' />
        </div>
        <div>
            <InputBox onChange={e=>{
              setUsername(e.target.value);
            }} label='Username' placeholder="Enter your username"></InputBox>
            <InputBox onChange={e=>{
              setName(e.target.value);
            }} label='Name' placeholder="Enter your Name"></InputBox>
            <InputBox onChange={e=>{
              setEmail(e.target.value);
            }} label='Email' placeholder="Enter your Email"></InputBox>
            <InputBox  onChange={e=>{
              setPassword(e.target.value);
            }}label='password' placeholder="Enter your password"></InputBox>
        </div>
        <span className="m-4" ><Button label="Sign In" onClick={async()=>{
          const response = await axios.post("http://localhost:4000/api/v1/user/register", {
              username,
              firstName,
              email,
              password
            })
            localStorage.setItem("token", response.data.token);
            router.push('/dashboard?userId=' + response.data.userId);
         }} /></span>
        <span >
            <BottomWarning label="Already have an account?" buttonText="Log In" link="/login" />
        </span>
    </div>
  ) 
}

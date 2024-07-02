'use client';
import { Heading } from "@/components/Heading"
import { SubHeading } from "@/components/SubHeading"
import { InputBox } from "@/components/InputBox"
import { Button } from "@/components/Button"
import { BottomWarning } from "@/components/BottomWarning";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export const LogIn = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  return (
    <div className="flex items-center justify-center flex-col p-10 bg-slate-50 text-black rounded-md">
        <div className="flex flex-col items-center">
            <Heading label="Log In" />
            <SubHeading label='Enter your information to LogIn' />
            <SubHeading label='to your account' />
        </div>
        <div>
            <InputBox onChange={(e)=>{
              setUsername(e.target.value);
            }} label='Username' placeholder="Enter your username"></InputBox>
            <InputBox onChange={(e)=>{
              setPassword(e.target.value);
            }} label='password' placeholder="Enter your password"></InputBox>
        </div>
        <span className="m-4" ><Button label="Log In" onClick={async()=>{
          const response = await axios.post("http://localhost:4000/api/v1/user/login", {
              username,
              password
            })
            localStorage.setItem("token", response.data.token);
            router.push('/dashboard?userId=' + response.data.userId);
         }}
          
         /></span>
        <span>
            <BottomWarning label="Don't have an account?" buttonText="Sign Up" link="/signup" />
        </span>
    </div>
  )
}
 
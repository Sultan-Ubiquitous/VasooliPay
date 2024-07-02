'use client';
import { Balance } from "@/components/Balance"
import { Users } from "@/components/Users"
import { useState } from "react"
import { useSearchParams } from 'next/navigation'
import { redirect } from "next/navigation";
import axios from "axios"

export default function Dashboard() {
  
  const searchParmas = useSearchParams();
  const [balance, setBalance] = useState(0);
  
  const userId= searchParmas?.get('userId');
  

  const fetchBalance = async () => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `http://localhost:4000/api/v1/accounts/balance?userId=${userId}`,
      headers: { 
        'Authorization': `Bearer ${localStorage.getItem("token")}`, 
        'Content-Type': 'text/plain'
      }
    };
    
    axios.request(config)
    .then((response) => {
      setBalance(response.data.balance);
    })
    .catch((error) => {
      console.log(error);
    });
    
  };

  fetchBalance();


  if(!userId){
    redirect('/login');
  }

  return (  
    <div className="flex flex-col p-10 w-screen bg-slate-50 text-black rounded-md">
        <Balance value={balance}/>
        <Users/>
    </div>
  )
}

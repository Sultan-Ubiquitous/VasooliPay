'use client';
import { useEffect, useState } from "react";
import {Button} from "./Button";
import axios from "axios";
import { useRouter } from 'next/navigation'

export const Users = () => {
    // Replace with backend call
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            axios.interceptors.request.use(
                config => {
                    config.headers.authorization = `Bearer ${localStorage.getItem("token")}`;
                    return config;
                }
            );
    
            try {
                const response = await axios.get("http://localhost:4000/api/v1/user/bulk?filter=" + filter);
                setUsers(response.data.user);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
        }, [filter]);

    return <>
        <div>
            <div className="font-bold mt-6 text-lg">
            Users
        </div>
        <div className="my-2">
            <input type="text" onChange={(e)=>{
                setFilter(e.target.value);
            }} placeholder="Search users..." className="w-full px-2 py-1 border rounded border-slate-200"></input>
        </div>
        <div>
            {users.map(user => <User user={user} />)}
        </div>
        </div>
    </>
}

type UserProps = {
    user: {
        username: string;
        firstName: string;
        _id: number;
    }
};

function User({user}: UserProps) {
    const router = useRouter();
    return <div className="flex justify-between space-y-4 border-b-2 p-1">
        <div className="flex">
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {user.username[0]}
                </div>
            </div>
            <div className="flex flex-col justify-center h-ful">
                <div>
                    {user.username} {user.firstName}
                </div>
            </div>
        </div>

        <div>
            <Button label={"Send Money"} onClick={()=>{
                router.push("/send?id="+ user._id + "&name=" + user.username);
            }} />
        </div>
    </div>
}
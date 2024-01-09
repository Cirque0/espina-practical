"use client";

import { useState, useContext, useEffect } from "react";
import { AuthContext } from "@/utils/AuthContext";
import { useRouter } from "next/navigation";

export default function Login() {
    const router = useRouter();

    const { state, dispatch } = useContext(AuthContext);

    useEffect(() => {
        if(state.user) {
            router.push('/')
        }
    }, [state.user, router])

    const [form, setForm] = useState({
        username: "",
        password: "",
    });

    const [error, setError] = useState('');

    const changeForm = (e) => {
        setForm((form) => ({
            ...form,
            [e.target.name]: e.target.value,
        }));
    };

    const submitForm = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const res = await fetch(`${location.origin}/api/account/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form),
            })

            const data = await res.json()
            if (data.message) {
                setError(data.message);
            }
            else {
                dispatch({type: 'login', user: data});
                window.sessionStorage.setItem('user', JSON.stringify(data));
            }
        }
        catch(error) {
            console.log(error)
        }

    }

    return (
        <div className='min-h-screen flex justify-center items-center'>
            <form onSubmit={submitForm} className="flex flex-col gap-2 items-center">
                <p className="font-bold text-xl text-center">Login</p>
                <label htmlFor='username'>
                    <p className="font-bold">Username</p>
                    <input
                        className="p-1 border-2 outline-none rounded"
                        type='text'
                        name='username'
                        id='username'
                        value={form.username}
                        onChange={changeForm}
                    />
                </label>
                <label htmlFor='password'>
                    <p className="font-bold">Password</p>
                    <input
                        className="p-1 border-2 outline-none rounded"
                        type='password'
                        name='password'
                        id='password'
                        value={form.password}
                        onChange={changeForm}
                    />
                </label>
                <button className="w-fit bg-black text-white p-2 text-xs uppercase tracking-widest rounded">Login</button>
                {error}
            </form>
        </div>
    );
}

"use client";

import { useState, useContext } from "react";
import { AuthContext } from "@/utils/AuthContext";

export default function Page() {
    const [form, setForm] = useState({
        username: "",
        password: "",
    });

    const changeForm = (e) => {
        setForm((form) => ({
            ...form,
            [e.target.name]: e.target.value,
        }));
    };

    return (
        <div className='min-h-screen flex justify-center items-center'>
            <form className="flex flex-col gap-2 items-center">
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
            </form>
        </div>
    );
}

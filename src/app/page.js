"use client";

import Image from "next/image";
import { useEffect, useContext } from "react";
import { AuthContext } from "@/utils/AuthContext";
import { useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter();
    const { state, dispatch } = useContext(AuthContext);

    useEffect(() => {
        if(!state.user) {
            router.push('/account/login')
        }
    }, [state.user])

    return (
        <main className='flex min-h-screen flex-col items-center justify-between p-24'>
            {JSON.stringify(state.user)}
        </main>
    );
}

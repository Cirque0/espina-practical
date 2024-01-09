"use client";

import { useEffect, useContext, useMemo, useState } from "react";
import { AuthContext } from "@/utils/AuthContext";
import { useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter();
    const { state, dispatch } = useContext(AuthContext);
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        if (!state.user) {
            router.push("/account/login");
        }
    }, [state.user]);

    useEffect(() => {
        const getLocations = async () => {
            const res = await fetch(`${window.origin}/api/territories`);
            const { data } = await res.json();

            let sortedArr = [];
            let mappedLocations = {};

            data.forEach((location) => {
                mappedLocations[location.id] = {
                    ...location,
                    children: [],
                };
            });

            for (let id in mappedLocations) {
                console.log(id);
                const location = mappedLocations[id];
                if (location.parent) {
                    mappedLocations[location.parent].children.push(location);
                } else {
                    sortedArr.push(location);
                }
            }

            setLocations(sortedArr);
        };

        getLocations();
    }, []);

    const logout = () => {
        window.sessionStorage.removeItem("user");
        dispatch({ type: "logout" });
    };

    return (
        <main className='flex min-h-screen flex-col p-24 gap-4'>
            {state.user ? (
                <>
                    <div className='flex items-center gap-4'>
                        <p className='font-bold'>{state.user.displayName}</p>
                        <button
                            onClick={logout}
                            className='w-fit bg-black text-white p-2 text-xs uppercase tracking-widest rounded'
                        >
                            Logout
                        </button>
                    </div>
                    <p className='font-bold text-2xl'>Territories</p>
                    <p>Here are the list of territories:</p>
                    {locations.length ? (
                        <ul className='list-disc main'>
                            {locations.map((location) => (
                                <Location key={location.id} location={location} />
                            ))}
                        </ul>
                    ) : (
                        <p>Wait a moment... </p>
                    )}
                </>
            ) : (
                <p className='font-bold text-xl'>
                    You are not authenticated. Redirecting to login page...
                </p>
            )}
        </main>
    );
}

function Location({ location }) {
    return (
        <li className='mx-8'>
            <span>{location.name}</span>
            <ul className='list-disc'>
                {location.children.map((child) => (
                    <Location key={child.id} location={child} />
                ))}
            </ul>
        </li>
    );
}

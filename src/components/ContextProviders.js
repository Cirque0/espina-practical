'use client';

import { AuthContext } from "@/utils/AuthContext";
import { useEffect, useReducer } from "react";

export default function ContextProviders({ children }) {
    const [state, dispatch] = useReducer(
        (prevState, action) => {
            switch(action.type) {
                case 'login':
                    return {
                        ...prevState,
                        user: action.user,
                    }
                case 'logout':
                    return {
                        ...prevState,
                        user: null,
                    }
            }
        },
        {
            user: null,
        }
    )

    useEffect(() => {
        const user = window.sessionStorage.getItem('user');

        if(user) dispatch({type: 'login', user: JSON.parse(user)});
    }, [])

    return (
        <AuthContext.Provider value={{state, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}
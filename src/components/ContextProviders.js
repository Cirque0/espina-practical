'use client';

import { AuthContext } from "@/utils/AuthContext";
import { useReducer } from "react";

export default function ContextProviders({ children }) {
    const user = window.sessionStorage.getItem('user');

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
            user: user ? JSON.parse(user) : null,
        }
    )

    return (
        <AuthContext.Provider value={{state, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}
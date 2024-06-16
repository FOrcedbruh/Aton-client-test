import { useContext, createContext, useState, useEffect, Dispatch, SetStateAction } from "react";

interface ContextType {
    authUser: string | null,
    setAuthUser: Dispatch<SetStateAction<string | null>> | null
}

const authContext = createContext<ContextType>({
    authUser: null,
    setAuthUser: null
});

export const useAuth = () => {
    return useContext(authContext);
}


export  const AuthProvider = ({children}: {children: React.ReactNode}) => {

    const [authUser, setAuthUser] = useState<string | null>('');

    useEffect(() => {
        //@ts-ignore
        setAuthUser(JSON.parse(localStorage.getItem('authUser')))
    }, [])

    return (
        <authContext.Provider value={{ authUser, setAuthUser }}>
            {children}
        </authContext.Provider>
    )
}
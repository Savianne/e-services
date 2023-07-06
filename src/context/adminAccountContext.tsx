import React, { createContext, ReactNode, useEffect, useState } from "react";
import doRequest from "../API/doRequest";

export interface IUser {
    name: string;
    avatar: string,
    email:string,
    UID: string,
    role: "admin" | "main admin"
}

export const AdminAccountContextProvider = createContext<IUser | null>(null);

const AdminAccountContext:React.FC<{children: ReactNode}> = ({children}) => {
    const [admin, setAdmin] = useState<IUser | null>(null)
    useEffect(() => {
        doRequest<IUser>({
            method: "POST",
            url: "/get-account-info",
            baseURL: "http://localhost:3005/admin"
        })
        .then((res) => {
            if(res.data) setAdmin(res.data);
        })
    }, [])
   return (
    <AdminAccountContextProvider.Provider value={admin}>
        {children}
    </AdminAccountContextProvider.Provider>
   )
};

export default AdminAccountContext;
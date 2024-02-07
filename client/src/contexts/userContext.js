import axios from "axios";
import { createContext, useEffect, useState } from "react";


export const UserContext = createContext( {} );

export function UserContextProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        getUser();
    }, [])

    const getUser = async () => {
        try {
            const token = localStorage.getItem('token');

            if(!token) {
                console.log("Token not available");
                return ;
            }

            const res = await axios.get("http://localhost:5000/api/user/refetch", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                withCredentials: true
            });

            setUser(res.data);

        } catch(err) {
            if(err.response && err.response.status === 404) {
                console.log("Resource not found: ", err.response.data);
            }
            else if(err.response && err.response.status === 401) {
                console.log("Unauthorized: ", err.response.data);
            }
            else {
                console.log("Error fetching user: ", err.message);
            }
        }
    }

    return(
        <UserContext.Provider value={{ user, setUser }}>
            { children }
        </UserContext.Provider>
    );
}
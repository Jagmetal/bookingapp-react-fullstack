import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (!user) {
            axios.get('/profile')
                .then((response) => {
                    setUser(response.data); // Assuming the user data is in response.data
                })
                .catch((error) => {
                    console.error("Error fetching user profile:", error);
                });
        }
    }, []); // You may want to trigger this effect whenever 'user' changes

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}

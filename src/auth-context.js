
import React, { useEffect, useState } from 'react';
const AuthContext = React.createContext({
    isLoggedIn:false,
    onlogOut :()=>{},
    onlogIn:(email,password)=>{}
});
export const AuthContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(()=>{
        const dataa=localStorage.getItem('isLoggedIn');
        if(dataa==='1'){
            setIsLoggedIn(true);
        }
    },[]);

    const logoutHandler = () => {
        localStorage.removeItem('isLoggedIn');
        setIsLoggedIn(false);
    }

    const loginHandler = () => {
        localStorage.setItem('isLoggedIn','1');
        setIsLoggedIn(true);
    };
        return (
            <AuthContext.Provider
            value={{
                isLoggedIn:isLoggedIn,
                onlogIn:loginHandler,
                onlogOut:logoutHandler
            }}
            >
                {props.children}
            </AuthContext.Provider>
            
        )
    
}
export default AuthContext;
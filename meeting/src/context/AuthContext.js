import { useContext,createContext, useEffect, useState } from "react";
import {GoogleAuthProvider,
        signInWithPopup,
        signInWithRedirect,
        signOut,
        onAuthStateChanged}from 'firebase/auth';
import { auth } from "../firebase";
const AuthContext=createContext()

export const AuthContextProvider=({children})=>{
    const [user,setUser]=useState({});

    const googleSignIn=()=>{
        try {
            const provider=new GoogleAuthProvider();
            signInWithPopup(auth,provider);
        } catch (error) {
            alert("Issue : "+error);
        }
        
    };
    const logOut=()=>{
        try {
            signOut(auth);     
        } catch (error) {
            alert("Sign OUT : "+error);
        }
       
    }
    useEffect(()=>{
        try {
            const unsubscribe=onAuthStateChanged(auth,(currentUser)=>{
                setUser(currentUser);
                console.log('User :',currentUser);
            });
            return()=>{
                unsubscribe();
            };    
        } catch (error) {
            alert("Unsubscribe Auth Context : "+error);
        }
        return()=> (<>
            <h1>Some Issue is There</h1>
        </>);
        
    },[]);
    
    return (
        <AuthContext.Provider value={{googleSignIn,logOut,user}}>
            {children}
        </AuthContext.Provider>
    );
}

export const UserAuth=()=>{
    return useContext(AuthContext)
};
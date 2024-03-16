import React from "react";
import { UserAuth } from "../context/AuthContext";

const Account=()=>{
    const {logOut,user}=UserAuth();
    const handleSignOut=async()=>{
        try{
            await logOut()
        }catch(error){
            console.log(error)  
        }
    }

    return (
        <div>
            <p className='d-flex justify-content-center align-items-center' style={{fontSize:'50px', padding:'5%',fontWeight:"Bold"}}>Welcome </p>
            <p className='d-flex justify-content-center align-items-center' style={{fontSize:'30px',fontWeight:"Bold"}}>{user?.displayName} </p>
            <div>
                <p className='d-flex justify-content-center align-items-center'>Please wait,You are being assigned a role.</p>
            </div>
        </div>
      );
}

export default Account;

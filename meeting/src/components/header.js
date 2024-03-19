import React from 'react'
import { Link } from 'react-router-dom'
import { UserAuth } from "../context/AuthContext";

const Navbar=()=>{
  const {user,logOut}=UserAuth();
  const handleSignOut=async()=>{
      try{
          await logOut()
      }catch(error){
          console.log(error)
      }
  }
  return (
    <nav className="navbar bg-body-tertiary" >
        <div className="container-fluid" >
            <a className="navbar-brand" style={{'fontWeight': 'bold','fontSize': '35px', color:'#007F73'}}>MEETING MANAGMENT SYSTEM</a>
            <form className="d-flex" role="search">
            {user?.displayName?<> {user.displayName}&nbsp;&nbsp;  <button className="btn btn-outline-success" type="submit" onClick={handleSignOut}>Logout</button></>:(<Link className="btn btn-outline-success" type="submit" to='/'>Sign In</Link>)}
            </form>
        </div>
    </nav>
  )
}

export default Navbar
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
    <nav class="navbar bg-body-tertiary" >
        <div class="container-fluid" >
            <a class="navbar-brand" style={{'font-weight': 'bold','font-size': '35px', color:'#007F73'}}>MEETING MANAGMENT SYSTEM</a>
            <form class="d-flex" role="search">
            {user?.displayName?(<button class="btn btn-outline-success" type="submit" onClick={handleSignOut}>Logout</button>):(<Link class="btn btn-outline-success" type="submit" to='/'>Sign In</Link>)}
            </form>
        </div>
    </nav>
  )
}

export default Navbar
import React,{useEffect} from 'react';
import  {GoogleButton} from 'react-google-button';
import { UserAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {auth} from '../firebase';
function Signin(){

  const {googleSignIn,user} = UserAuth();
  const navigate=useNavigate();

  const handleGoogleSignIn=async()=>{
    try{
      await googleSignIn();
    }catch(error){
      console.log(error);
    }
}

  useEffect(() => {
    const checkCollegeDomain = async () => {
      // Get the currently signed-in user
      const currentUser = auth.currentUser;

      if (currentUser) {
        // Extract the email address
        const email = currentUser.email;

        // Check if the email belongs to your college domain
        if (!email.endsWith('@nitc.ac.in')) {
          // Sign out the user if email doesn't belong to the college domain
          await auth.signOut();
          alert('Only users from your college are allowed to access this application.');
        } else {
          navigate('/dashboard'); // Redirect to the account page if the user is signed in and from the college domain
        }
      }
    };
    // Check the user's domain when the component mounts
    checkCollegeDomain();
  },[user]);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-6">
          <p className="text-center" style={{ fontSize: '200px', paddingTop:'25%', font:'Helvetica',fontWeight:"Bold",color:'#222831' }}>MMS</p>
          {/* <p className="text-center" style={{ fontSize: '18px', font:'Helvetica',fontWeight:"Bold",color:'#222831' }}>Managing meeting the right way</p> */}
        </div>
      <div className="col-md-6" style={{ width: '20rem',paddingTop:'16%',paddingLeft:'8%'}}>
      <div className="card text-center" style={{ width: '30rem'}}>
        <div className="card-body">
          <h2 className="card-title">Login</h2>
          <p className="card-text">PLease login with your NITC mail id</p>
          <div className='d-flex justify-content-center align-items-center'>
            <GoogleButton onClick={handleGoogleSignIn}/>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>


  );
}

export default Signin;
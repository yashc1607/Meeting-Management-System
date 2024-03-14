// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getAuth} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCNvcuSlZ4kYVrAZy3y4HGLtzjRfEBJHOw",
  authDomain: "auth-test-be300-e061b.firebaseapp.com",
  projectId: "auth-test-be300",
  storageBucket: "auth-test-be300.appspot.com",
  messagingSenderId: "678991255954",
  appId: "1:678991255954:web:1af7b1ab1451e0366b094b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);

// const provider = new GoogleAuthProvider()
//export const signInWithGoogle = () =>signInWithPopup(auth,provider);

// export const signInWithGoogle = () =>{
//     signInWithPopup(auth,provider)
//         .then((result) =>{
            
//             const name=result.user.displayName
//             const email=result.user.email
//             const profilePic=result.user.photoURL;

//             localStorage.setItem("name",name)
//             localStorage.setItem("email",email)
//             localStorage.setItem("profilePic",profilePic)
//         })
//         .catch((error) =>{
//             console.log(error);
//         })
// };
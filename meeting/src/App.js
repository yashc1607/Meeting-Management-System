import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Header from './components/header';
import Admin from './pages/admin';
import AddKeyword from './pages/addKeyword';
import DeleteUser from './pages/DeleteUser';
import DeleteKeyword from './pages/deleteKeyword';
import PrivateRoute from './components/PrivateRoute';
import HomePage from './pages/Home';
import Account from './pages/Account';
import Protected from "./components/Protected";
import { AuthContextProvider } from "./context/AuthContext";

export default function App() {
  return (
    <Router >
      <AuthContextProvider>
        <Header></Header>
        <Routes>
          
          <Route path="/" element={<HomePage />} />
          <Route path="/Admin" element={<Admin/>} />
          <Route path="/AddKeyword" element={<AddKeyword/>} />
          <Route path="/DeleteUser" element={<DeleteUser/>} />
          <Route path="/DeleteKeyword" element={<DeleteKeyword/>} />
          <Route path="/account" element={<Protected ><Account /></Protected>}/>
          <Route element={<PrivateRoute/>}></Route>
        </Routes>
        </AuthContextProvider>
    </Router>
  )
}

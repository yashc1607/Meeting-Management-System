import Signin from './pages/Signin';
import Account from './pages/Account';
import Protected from "./components/Protected";
import {AuthContextProvider} from "./context/AuthContext";
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Header from './components/header';
import Admin from './pages/admin';
import AddKeyword from './pages/addKeyword';
import DeleteUser from './pages/DeleteUser';
import DeleteKeyword from './pages/deleteKeyword';
import PrivateRoute from './components/PrivateRoute';
import AssignGroup from './pages/assignGroup';
import AddGroup from './pages/addGroup';
import AddRole from './pages/addRole';
import AssignRole from './pages/assignRole';
import RemoveAssignedGroup from './pages/RemoveAssignedGroup';
import Dashboard from './pages/Dashboard';
import HostMeeting from './pages/HostMeeting';
import RemoveAssignedRole from './pages/removeAssignedRole';

export default function App() {
  return (
    <Router >
      <AuthContextProvider>
        <Header></Header>
        <Routes>
          <Route path="/" element={<Signin/>} />
          <Route path="/Admin" element={<Protected ><Admin/></Protected>} />
          <Route path="/AddKeyword" element={<Protected ><AddKeyword/></Protected>} />
          <Route path="/DeleteUser" element={<Protected ><DeleteUser/></Protected>} />
          <Route path="/DeleteKeyword" element={<Protected ><DeleteKeyword /></Protected>} />
          <Route path="/AddGroup" element={<Protected ><AddGroup /></Protected>} />
          <Route path="/AddRole" element={<Protected ><AddRole /></Protected>} />
          <Route path="/AssignRole" element={<Protected ><AssignRole /></Protected>} />
          <Route path="/AssignGroup" element={<Protected ><AssignGroup /></Protected>} />
          <Route path="/RemoveAssignedGroup" element={<Protected ><RemoveAssignedGroup /></Protected>} />
          <Route path="/Dashboard" element={<Protected ><Dashboard /></Protected>} />
          <Route path="/account" element={<Protected ><Account /></Protected>}/>       
          <Route path="/RemoveAssignedRole" element={<Protected ><RemoveAssignedRole /></Protected>}/>               
        </Routes>
       </AuthContextProvider>
    </Router>
  )
}

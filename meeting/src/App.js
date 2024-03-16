import HomePage from './pages/Home';
import Account from './pages/Account';
import Protected from "./components/Protected";
import { AuthContextProvider } from "./context/AuthContext";
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Header from './components/header';
import Admin from './pages/admin';
import AddKeyword from './pages/addKeyword';
import DeleteUser from './pages/DeleteUser';
import DeleteKeyword from './pages/deleteKeyword';
import PrivateRoute from './components/PrivateRoute';
import AssignGroup from './pages/assignGroup';
import AddGroup from './pages/addGroup';
import RemoveAssignedGroup from './pages/RemoveAssignedGroup';
import Dashboard from './pages/Dashboard';
import HostMeeting from './pages/HostMeeting';

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
          <Route path="/AddGroup" element={<AddGroup/>} />
          <Route path="/AssignGroup" element={<AssignGroup/>} />
          <Route path="/Dashboard" element={<Dashboard/>} />
          <Route path="/HostMeeting" element={<HostMeeting/>} />
          <Route path="/RemoveAssignedGroup" element={<RemoveAssignedGroup/>} />
          <Route path="/account" element={<Protected ><Account /></Protected>}/>
        </Routes>
       </AuthContextProvider>
    </Router>
  )
}

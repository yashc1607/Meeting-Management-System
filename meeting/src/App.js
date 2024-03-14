import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Header from './components/header';
import Signin from './pages/Signin';
import Admin from './pages/admin';
import AddKeyword from './pages/addKeyword';
import DeleteUser from './pages/DeleteUser';
import DeleteKeyword from './pages/deleteKeyword';
import PrivateRoute from './components/PrivateRoute';
import AssignGroup from './pages/assignGroup';
import AddGroup from './pages/addGroup';
export default function App() {
  return (
    <BrowserRouter >
      <Header></Header>
      <Routes>
        
        <Route path="/" element={<Signin />} />
        <Route path="/Admin" element={<Admin/>} />
        <Route path="/AddKeyword" element={<AddKeyword/>} />
        <Route path="/DeleteUser" element={<DeleteUser/>} />
        <Route path="/DeleteKeyword" element={<DeleteKeyword/>} />
        <Route path="/AddGroup" element={<AddGroup/>} />
        <Route path="/AssignGroup" element={<AssignGroup/>} />
        <Route element={<PrivateRoute/>}>
          
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

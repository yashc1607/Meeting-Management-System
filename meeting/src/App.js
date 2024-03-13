import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Header from './components/header';
import Signin from './pages/Signin';
import Admin from './pages/admin';
import AddKeyword from './pages/addKeyword';
import UpdateUser from './pages/UpdateUser';
import PrivateRoute from './components/PrivateRoute';
export default function App() {
  return (
    <BrowserRouter >
      <Header></Header>
      <Routes>
        
        <Route path="/" element={<Signin />} />
        <Route path="/Admin" element={<Admin/>} />
        <Route path="/AddKeyword" element={<AddKeyword/>} />
        <Route path="/UpdateUser" element={<UpdateUser/>} />
        <Route element={<PrivateRoute/>}>
          
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

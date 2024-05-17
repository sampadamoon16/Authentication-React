import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Register from './Register';
import Login from './Login';
import  Navbar  from './Nav/Navbar';


function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>        
        <Route path='/register' element={<Register />}></Route>
        <Route path='/' element={<Login />}></Route>
        <Route path='/nav/navbar' element={<Navbar />}></Route>
    </Routes>
    
    </BrowserRouter>    
    
    
    </>
  );
}

export default App;

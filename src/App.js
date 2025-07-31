import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home/Home';
import About from './components/About/About';
import Help from './components/Help/Help';
import Contact from './components/Contact/Contact';
import Login from './components/login/Login';
import SignUp from './components/signUp/SignUp';
import Article from './components/Articles/Article';
import Profile from './components/Profile/Profile';
import Dialect from './components/Dialects/Dialect';
import EditProfile from './components/Profile/EditProfile';

function App() {
  return <>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/help" element={<Help />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/login" element={<Login/>}/>
    <Route path="/sign-up" element={<SignUp/>}/>
    <Route path="/articles" element={<Article/>}/>
    <Route path="/profile" element={<Profile/>}/>
    <Route path="/edit-profile" element={<EditProfile/>}/>
    <Route path="/dialects" element={<Dialect/>}/>

   
  </Routes>
  </>
}

export default App;

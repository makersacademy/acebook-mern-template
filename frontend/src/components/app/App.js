import './App.css';
import LoginForm from '../auth/LoginForm'
import SignUpForm from '../user/SignUpForm'
import NavBar from '../navBar/NavBar';
import NewPost from '../newPost/NewPost';
import Feed from '../feed/Feed'
import {
  useNavigate,
  Routes,
  Route,
} from "react-router-dom";



const App = () => {
    return (
        <Routes>
          <Route path='/posts'  element={<Feed navigate={ useNavigate() }/>}/>
          <Route path='/login'  element={<LoginForm  navigate={ useNavigate() }/>}/>
          <Route path='/signup' element={<SignUpForm navigate={ useNavigate() }/>}/>
          <Route path='/navbar' element={<NavBar navigate={ useNavigate() }/>}/>
          <Route path='/newpost' element={<NewPost navigate={ useNavigate() }/>}/>
        </Routes>
    );
}

export default App;

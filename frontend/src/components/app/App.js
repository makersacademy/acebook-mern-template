import './App.css';
import LoginForm from '../auth/LoginForm'
import SignUpForm from '../user/SignUpForm'
import NavBar from '../navBar/NavBar';
import NewPost from '../newPost/NewPost';
import Feed from '../feed/Feed'
import ProfileFeed from '../profileFeed/ProfileFeed';
import Profile from '../profile/Profile';
import Post from '../post/Post';
import Find from '../find/Find';
import { useNavigate, Routes, Route } from "react-router-dom";
import { FindContext } from '../findContext/FindContext.js';
import {useState} from 'react';
import Result from '../result/Result';



const App = () => {
  const [searchResults, setSearchResults] = useState([]);
    return (
      <FindContext.Provider value={{searchResults, setSearchResults}}> 
        <Routes>
          <Route path='/posts'  element={<Feed navigate={ useNavigate() }/>}/>
          <Route path='/posts/user'  element={<ProfileFeed navigate={ useNavigate() }/>}/>
          <Route path='/login'  element={<LoginForm  navigate={ useNavigate() }/>}/>
          <Route path='/signup' element={<SignUpForm navigate={ useNavigate() }/>}/>
          <Route path='/navbar' element={<NavBar navigate={ useNavigate() }/>}/>
          <Route path='/profile' element={<Profile navigate={ useNavigate() }/>}/>
          <Route path='/newpost' element={<NewPost navigate={ useNavigate() }/>}/>
          <Route path="/posts/:postId" element={<Post />} /> 
          <Route path="/posts/:postId/likes" element={<Post />} /> 
          <Route path='/search' element={<Result navigate={ useNavigate() }/> } />
        </Routes>
        </FindContext.Provider>
    );
}

export default App;

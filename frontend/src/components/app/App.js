import './App.css';
import LoginForm from '../auth/LoginForm'
import SignUpForm from '../user/SignUpForm'
import NavBar from '../navBar/navBar';
import Feed from '../feed/Feed'
import CommentFeed from '../commentFeed/CommentFeed';
import {
    useNavigate,
    Routes,
    Route,
} from "react-router-dom";

const App = () => {
    return (
        <>
            <NavBar/>
            <Routes>
                <Route path='/posts' element={<Feed navigate={useNavigate()} />} />
                <Route path='/posts/:post_id' element={<CommentFeed navigate={useNavigate()} />} />
                <Route path='/login' element={<LoginForm navigate={useNavigate()} />} />
                <Route path='/signup' element={<SignUpForm navigate={useNavigate()} />} />
            </Routes> 
        </>
    );
}

export default App;
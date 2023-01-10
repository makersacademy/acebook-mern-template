import { Link } from 'react-router-dom'
import { BrowserRouter as Router } from 'react-router-dom';

const Home = () => {
  return ( 
    <div className="homepage-contents">
      <h1>Home</h1>
      <Router>
      <Link to="/login">
        <button id="login">Log in</button>
      </Link>
      <Link to="/signup">
        <button id="sign-up">Sign up</button>
      </Link>
      </Router>
    </div>
   );
}
 
export default Home;



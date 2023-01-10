import { Link } from 'react-router-dom'

const Home = () => {
  return ( 
    <div className="homepage-contents">
      <h1>Home</h1>
      <Link to="/login">
        <button id="login">Log in</button>
      </Link>
      <Link to="/signup">
        <button id="sign-up">Sign up</button>
      </Link>
    </div>
   );
}
 
export default Home;



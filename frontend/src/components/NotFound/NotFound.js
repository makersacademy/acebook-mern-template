import { Link } from 'react-router-dom';
import "./NotFound.css";

const NotFound = () => {
  return (
    <div className="not-found-div">
      <h1>404 error</h1>
      <h2>The page you were looking for does not exist</h2>
      <Link to="/">Click here to return to homepage</Link>
    </div>
  );
}
 
export default NotFound;
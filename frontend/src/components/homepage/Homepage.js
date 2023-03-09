import CreatePost from "../CreatePost/CreatePost";
import Feed from "../feed/Feed";
import { useNavigate} from "react-router-dom";

const Homepage = ({ navigate }) => {


    return (
        <>
        <br></br>
        <Feed navigate={ useNavigate() }/>
        </>
    )
}

export default Homepage;
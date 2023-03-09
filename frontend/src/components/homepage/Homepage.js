import CreatePost from "../CreatePost/CreatePost";
import Feed from "../feed/Feed";
import { useNavigate} from "react-router-dom";

const Homepage = ({ navigate }) => {


    return (
        <>
        <CreatePost></CreatePost>
        <br></br>
        <Feed navigate={ useNavigate() }/>
        </>
    )
}

export default Homepage;
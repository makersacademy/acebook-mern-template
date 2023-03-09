import CreatePost from "../CreatePost/CreatePost";
import Feed from "../feed/Feed";
import { useNavigate} from "react-router-dom";

const Homepage = ({ navigate }) => {


    return (
        <>
        <Feed navigate={ useNavigate() }/>
        </>
    )
}

export default Homepage;
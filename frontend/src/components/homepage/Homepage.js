import Feed from "../feed/Feed";
import { useContext } from 'react'
import { UserContext } from '../../context/UserContext';

const Homepage = (props) => {
    const {userInfo} = useContext(UserContext);

    console.log("Context is: ", useContext(UserContext))
    console.log("test: ", userInfo._id )

    return (
        <>
            {userInfo ? <Feed navigate={props.navigate}/> : <div>You need an account to view and create posts.</div>}
        </>
    )
}

export default Homepage;
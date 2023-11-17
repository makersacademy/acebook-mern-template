import React from "react";
import { useNavigate, } from "react-router-dom";


const HomePage = () => {
	const navigate = useNavigate()
	const handleLoginClick = () => {
		navigate('/login')
	}

	const handleSignUpClick = () => {
		navigate('/signup')
	}
    return (
		<>
		<h1 className="welcome-banner" style={{ textAlign: "center" }} > Welcome to AceBook</h1>
		<div>
				<button onClick={handleLoginClick} id="login-button" >Log in</button> <br></br>
				<button onClick={handleSignUpClick} id="signup-button">Create an account</button>

		</div>
		</>
)
}

export default HomePage;
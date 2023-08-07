import { MemoryRouter} from "react-router"
import UserInfo from "./userInfo"
import React from "react"

describe("User information page", () => {

	it("calls the users/userID endpoint and lists the users info", () => {
    window.localStorage.setItem("token", "fakeToken")
    
    // const mockUserInfo = {
    //         username: "testUserName",
    //         email: "testEmail"
    //         }

    // cy.stub(require('react-router-dom'), 'useParams').returns({ userId: '1' });

    cy.intercept('GET', '/users/1', {email: "testEmail", username: "testUserName", token: 'fakeToken' }).as('getUserInfo');

    cy.mount(
			<MemoryRouter initialEntries={['/users/1']}>       
				<UserInfo />                
			</MemoryRouter>
		);
    
    cy.wait('@getUserInfo')

    cy.get('[data-cy=username]').should('contain.text', "Username: testUserName");
    cy.get('[data-cy=email]').should("contain.text", "Email: testEmail");
    
	})
})


// describe("User Info", () => {
// 	it("Calls the /users/:id endpoint and displays users account info", () => {
//     window.localStorage.setItem("token", "fakeToken")

//     const userId = 1;

//     cy.intercept('GET', `/users/${userId}`, (req) => {
//       req.reply({
//       statusCode: 200,
//       body: { username: 'TestUsername',
//               email: 'TestEmail'      
//           }
//         })
//       }
//     ).as("getUserInfo")
  
//     cy.mount(<UserInfo />)
  
//     cy.wait("@getUserInfo").then(() =>{
//       cy.get('[data-cy="username"]')
//         .should('contain.text', "Username: TestUsername")
//       cy.get('[data-cy="email"]')
//         .should('contain.text', "Email: TestEmail")
//     })
// 	})
// })
import { MemoryRouter, Route, Routes} from "react-router"
import UserInfo from "./userInfo"
import React from "react"

describe("User information page", () => {

	it("calls the users/userID endpoint and lists the users info", () => {
    window.localStorage.setItem("token", "fakeToken")
    cy.intercept('GET', '/users/1', { email: "testEmail", username: "testUserName", token: 'fakeToken' }).as('getUserInfo');

    cy.mount(
      <MemoryRouter initialEntries={['/users/1']}>  
        <Routes>
          <Route path="/users/:userId" element={<UserInfo />} />
        </Routes>
      </MemoryRouter>
    );
    
    cy.wait('@getUserInfo')

    cy.get('[data-cy=email]').should("contain.text", "Email: testEmail");
    cy.get('[data-cy=username]').should('contain.text', "Username: testUserName");

	})

  it('Throws an error if user is not authorized, or no user exists', () => {
    window.localStorage.setItem("token", "fakeToken")
    cy.intercept('GET', '/users/1', { statusCode: 400, token: 'fakeToken' }).as('getUserInfo');

    cy.mount(
      <MemoryRouter initialEntries={['/users/1']}>  
        <Routes>
          <Route path="/users/:userId" element={<UserInfo />} />
        </Routes>
      </MemoryRouter>
    );

    cy.wait("@getUserInfo")
    cy.url().should('include', 'login')

  })

})

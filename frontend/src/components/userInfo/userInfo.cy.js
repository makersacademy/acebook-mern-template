import { MemoryRouter, Route, Routes } from "react-router"
import UserInfo from "./userInfo"
import React from "react"

describe("User information page", () => {

    it("calls the users/userID endpoint and lists the users info", () => {

        const mockUserInfo = {
            username: "testUserName",
            email: "testEmail"
        }

        cy.stub(require('react-router-dom'), 'useParams').returns({ userId: '1' });

        cy.mount(
            <MemoryRouter initialEntries={['/users/1']}>
                <Routes>
                    <Route path="/users/:userId" element={<UserInfo userInfo={mockUserInfo} />} />                
                </Routes>
            </MemoryRouter>
        );

        cy.intercept('GET', '/users/1', { json: { userInfo: mockUserInfo } }).as('getUserInfo');

        cy.wait('@getUserInfo').then(() => {
            cy.get('[data-cy=username]').should('contain.text', "Username: testUserName");
            cy.get('[data-cy=email]').should("contain.text", "Email: testEmail");
        })
    })
})

// const testEmail = "user1@email.com"
// const testUsername= "username1"


 // window.localStorage.setItem("token", "fakeToken")

        // cy.intercept('GET', `/users/${user_id}`, (req) => {
        //     req.reply({
        //         statusCode: 200,
        //         body: {
        //             username: `${testUsername}`,
        //             email: `${testEmail}`
        //         }
        //     })
        //     }
        // ).as("getUserInfo")


// cy.wait("@getUserInfo").then(() =>{
        //     cy.get('[data-cy="username"]')
        //     .should('contain.text', "username1")
        //     cy.get('[data-cy="email"]')
        //     .should("contain.text", "user1@email.com");
        // }) 
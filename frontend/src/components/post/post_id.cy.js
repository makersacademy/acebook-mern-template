import PostId from "./post_id"
import {
    MemoryRouter,
    Routes,
    Route,
} from "react-router-dom";


// describe("My app", () => {
//     it("renders correctly", () => {
//       let renderer = create(
//         <MemoryRouter initialEntries={["/users/mjackson"]}>
//           <Routes>
//             <Route path="users" element={<Users />}>
//               <Route path=":id" element={<UserProfile />} />
//             </Route>
//           </Routes>
//         </MemoryRouter>
//       );
  
//       expect(renderer.toJSON()).toMatchSnapshot();
//     });
//   });





describe("info from post id", () => {
    it('renders correctly', () => {
        
        window.localStorage.setItem("token", "fakeToken")
        cy.intercept('GET', '/posts/64cbba05e72b5857555a24a2', {token: 'fakeToken',
                statusCode: 200,
                body: {message: 'Hello world'}
            }).as("getPost")
        cy.mount(
            <MemoryRouter initialEntries={['/posts/64cbba05e72b5857555a24a2']}>  
              <Routes>
                <Route path="/posts/:PostId" element={<PostId />} />
              </Routes>
            </MemoryRouter>
          );
        cy.screenshot()
        cy.wait("@getPost")
        cy.get('[data-cy=post]').should('contain.text', 'Hello world')
        })
    })

    // describe("User information page", () => {

    //     it("calls the users/userID endpoint and lists the users info", () => {
    //     window.localStorage.setItem("token", "fakeToken")
    //     cy.intercept('GET', '/users/1', { email: "testEmail", username: "testUserName", token: 'fakeToken' }).as('getUserInfo');
    
    //     cy.mount(
    //       <MemoryRouter initialEntries={['/users/1']}>  
    //         <Routes>
    //           <Route path="/users/:userId" element={<UserInfo />} />
    //         </Routes>
    //       </MemoryRouter>
    //     );
        
    //     cy.wait('@getUserInfo')
    
    //     cy.get('[data-cy=email]').should("contain.text", "Email: testEmail");
    //     cy.get('[data-cy=username]').should('contain.text', "Username: testUserName");
    
    //     })
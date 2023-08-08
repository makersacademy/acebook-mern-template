import PostId from "./post_id"
import {
    MemoryRouter,
    Routes,
    Route,
} from "react-router-dom";

describe("info from post id", () => {
    it('renders correctly', () => {
        // window.localStorage.setItem("token", "fakeToken")
        cy.intercept('GET', '/posts/64cbba05e72b5857555a24a2', {
                statusCode: 200,
                body: {message: 'Hello world'}
            }).as("getPost")
        cy.mount(
            <MemoryRouter initialEntries={['/posts/64cbba05e72b5857555a24a2']}>  
              <Routes>
                <Route path="/posts/:id" element={<PostId />} />
              </Routes>
            </MemoryRouter>
          );
        cy.wait("@getPost")
        cy.get('[data-cy=post]').should('contain.text', 'Hello world')
        })
    })
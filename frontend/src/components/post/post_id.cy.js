import PostId from "./post_id";
import { MemoryRouter, Routes, Route } from "react-router-dom";

describe("info from post id", () => {
    it("renders correctly", () => {
        cy.intercept("GET", "/posts/64cbba05e72b5857555a24a2", {
            statusCode: 200,
            body: { message: "Hello world", author: "person1" },
        }).as("getPost");
        cy.mount(
            <MemoryRouter initialEntries={["/posts/64cbba05e72b5857555a24a2"]}>
                <Routes>
                    <Route path="/posts/:id" element={<PostId />} />
                </Routes>
            </MemoryRouter>
        );
        cy.wait("@getPost");
        cy.get("[data-cy=post]").should("contain.text", "Hello world");
        cy.get("[data-cy=author]").should("contain.text", "person1");
    });
    it("renders an edit form", () => {
        cy.intercept("GET", "/posts/64cbba05e72b5857555a24a2", {
            statusCode: 200,
            body: { message: "Hello world", author: "person1" },
        }).as("getPost");
        cy.mount(
            <MemoryRouter initialEntries={["/posts/64cbba05e72b5857555a24a2"]}>
                <Routes>
                    <Route path="/posts/:id" element={<PostId />} />
                </Routes>
            </MemoryRouter>
        );
        cy.wait("@getPost");
        cy.get("[data-cy=editPostForm]").should("exist");
    });
    it("renders an edit form and updates the post", () => {
        cy.intercept("GET", "/posts/64cbba05e72b5857555a24a2", {
            statusCode: 200,
            body: { message: "Hello world", author: "person1" },
        }).as("getPost");

        cy.mount(
            <MemoryRouter initialEntries={["/posts/64cbba05e72b5857555a24a2"]}>
                <Routes>
                    <Route path="/posts/:id" element={<PostId />} />
                </Routes>
            </MemoryRouter>
        );
        cy.wait("@getPost");
        cy.get("[data-cy=editPost]").type("edited post");
        cy.get("[data-cy=editPostForm]").submit();

        cy.intercept("PUT", "/posts/64cbba05e72b5857555a24a2", {
            statusCode: 200,
            body: {
                message: "OK",
                token: "token",
                post: { message: "edited post", author: "person1" },
            },
        }).as("editPost");
        cy.wait("@editPost");
        cy.get("[data-cy=post]").should("contain.text", "edited post");
    });
});

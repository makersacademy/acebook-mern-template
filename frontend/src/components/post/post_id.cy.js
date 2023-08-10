import PostId from "./post_id";
import { MemoryRouter, Routes, Route } from "react-router-dom";

describe("info from post id", () => {
    it("renders correctly", () => {
        cy.intercept("GET", "/posts/64cbba05e72b5857555a24a1", {
            statusCode: 200,
            body: { message: "Hello world test1", author: "person1" },
        }).as("getPost1");
        cy.mount(
            <MemoryRouter initialEntries={["/posts/64cbba05e72b5857555a24a1"]}>
                <Routes>
                    <Route path="/posts/:id" element={<PostId />} />
                </Routes>
            </MemoryRouter>
        );
        cy.wait("@getPost1");
        cy.get("[data-cy=post]").should("contain.text", "Hello world test1");
        cy.get("[data-cy=author]").should("contain.text", "person1");
    });
    it("renders an edit form", () => {
        window.localStorage.setItem("userId", "userId");
        cy.intercept("GET", "/posts/64cbba05e72b5857555a24a2", {
            statusCode: 200,
            body: { message: "Hello world test2", author: "person2", authorId:"userId" },
        }).as("getPost2");
        cy.mount(
            <MemoryRouter initialEntries={["/posts/64cbba05e72b5857555a24a2"]}>
                <Routes>
                    <Route path="/posts/:id" element={<PostId />} />
                </Routes>
            </MemoryRouter>
        );
        cy.wait("@getPost2");
        cy.get("[data-cy=editPostForm]").should("exist");
    });
});


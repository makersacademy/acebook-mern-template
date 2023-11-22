import MessageHeader from "./MessageHeader"

describe("MessageHeader", () => {
    it("shows username of person who has written a post", () =>
    cy.mount(<MessageHeader username="testUser") />);
    cy.get ('[data-cy="username"]'.should("contain.text", "testUser"))
})
})
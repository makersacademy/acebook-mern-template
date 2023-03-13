import React from "react";
import Post from "./Post";

describe("Post", () => {
  beforeEach(() => {
    cy.request({
      method: "POST",
      url: "http://localhost:8080/tokens",
      body: {
        email: "terry@gmail.com",
        password: "1234",
      },
    }).then((resp) => {
      window.localStorage.setItem("token", resp.body.token);
    });
  });

  it("renders a post with a message", () => {
    const postContent = {
      _id: 1,
      message: "Hello, world",
      author: { username: "Abi" },
      createdAt: "2023-01-01T12:00:00.00+00:00",
      likes: [],
    };
    cy.mount(<Post post={postContent} />);
    cy.get('[data-cy="post"]').should("contain.text", "Hello, world");
  });

  it("displays an unfilled heart when a post is created", () => {
    const postContent = {
      _id: 1,
      message: "Hello, world",
      author: { username: "Abi" },
      createdAt: "2023-01-01T12:00:00.00+00:00",
      likes: [],
    };
    cy.mount(<Post post={postContent} />);
    cy.get('[data-cy="filled-like-button"]').should("not.exist");
    cy.get('[data-cy="like-button"]').should("have.class", "fill-black");
  });

  xit("shows 0 likes when the post is first created", () => {});

  xit("fills in red when the like button is clicked", () => {});

  xit("shows 1 like when the post is liked", () => {});

  xit("returns to being unfilled when the button is clicked again", () => {});
});

// Number of likes/Colour of button
// Is the like button present and black

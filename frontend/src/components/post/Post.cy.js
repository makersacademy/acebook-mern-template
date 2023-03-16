import React from "react";
import Post from "./Post";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDBiZWUyMjliODYzNjE2ZmIzYTgxZGYiLCJpYXQiOjE2Nzg3OTc1MjQsImV4cCI6MTY3ODc5ODEyNH0.7i8_7dh3wObsZ3W46B-PW7P1bXEVw9dhwJROrtg_hTQ";

describe("Post", () => {
  beforeEach(() => {
    window.localStorage.setItem("token", token);

    const postContent = {
      _id: 1,
      message: "Hello, world",
      author: { username: "Abi" },
      createdAt: "2023-01-01T12:00:00.00+00:00",
      likes: [],
    };
    cy.mount(<Post post={postContent} />);
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
    cy.get('[data-cy="filled-like-button"]').should("not.exist");
    cy.get('[data-cy="like-button"]').should("have.class", "fill-black");
  });

  it("shows 0 likes when the post is first created", () => {
    cy.get('[data-cy="likes-length"]').invoke("text").should("contain", "0");
  });

  it("fills in red when the like button is clicked", () => {
    // SETUP
    cy.intercept("Post", "/posts/like", {
      statusCode: 201,
      body: {
        updatedPost: {
          likes: ["640bee229b863616fb3a81df"],
        },
        token,
      },
    });

    // ACTION
    cy.get('[data-cy="like-button"]').click();

    // ASSERT
    cy.get('[data-cy="filled-like-button"]').should(
      "have.class",
      "fill-red-500"
    );
  });

  it("shows 1 like when the post is liked", () => {
    // SETUP
    cy.intercept("Post", "/posts/like", {
      statusCode: 201,
      body: {
        updatedPost: {
          likes: ["640bee229b863616fb3a81df"],
        },
        token,
      },
    });

    // ACTION
    cy.get('[data-cy="like-button"]').click();

    // ASSERT
    cy.get('[data-cy="likes-length"]').invoke("text").should("contain", "1");
  });

  it("returns to being unfilled when the button is clicked again", () => {
    // SETUP
    cy.intercept("Post", "/posts/like", {
      statusCode: 201,
      body: {
        updatedPost: {
          likes: ["640bee229b863616fb3a81df"],
        },
        token,
      },
    });

    cy.intercept("Delete", "/posts/like", {
      statusCode: 201,
      body: {
        updatedPost: {
          likes: [],
        },
        token,
      },
    });

    // ACTION
    cy.get('[data-cy="like-button"]').click();
    cy.get('[data-cy="filled-like-button"]').click();

    // ASSERT
    cy.get('[data-cy="filled-like-button"]').should("not.exist");
    cy.get('[data-cy="like-button"]').should("have.class", "fill-black");
  });

  it("has 0 likes when the button is clicked again", () => {
    // SETUP
    cy.intercept("Post", "/posts/like", {
      statusCode: 201,
      body: {
        updatedPost: {
          likes: ["640bee229b863616fb3a81df"],
        },
        token,
      },
    });

    cy.intercept("Delete", "/posts/like", {
      statusCode: 201,
      body: {
        updatedPost: {
          likes: [],
        },
        token,
      },
    });

    // ACTION
    cy.get('[data-cy="like-button"]').click();
    cy.get('[data-cy="filled-like-button"]').click();

    cy.get('[data-cy="likes-length"]').invoke("text").should("contain", "0");
  });
});

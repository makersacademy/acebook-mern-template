import React from "react";
import Button from "./Button";

describe("Button component", () => {
  describe("default setting", () => {
    it("should display the text correctly", () => {
      cy.mount(<Button text="testing text" />);

      cy.get("button").should("have.text", "testing text");
    });

    it("should be a solid button as default style", () => {
      cy.mount(<Button />);

      cy.get("button").should("have.class", "bg-blue-600");
    });

    it("should have a 'button' type as default", () => {
      cy.mount(<Button />);
      cy.get('[type="button"]').should("exist");
    });
  });

  describe("passing props", () => {
    it("should change to outline style if a button style is passed as a props", () => {
      cy.mount(<Button buttonStyle="outline" />);

      cy.get("button").should("not.have.class", "bg-blue-600");
      cy.get("button").should("have.class", "border-blue-500");
    });

    it("should set up the id correctly", () => {
      cy.mount(<Button id="testing-btn" />);

      cy.get("#testing-btn").should("exist");
    });

    it("should pass a onClick function inside the button", () => {
      const functionMock = {
        click: () => {},
      };
      cy.spy(functionMock, "click").as("clickFunctionMock");
      cy.mount(<Button clickCallback={functionMock.click} />);

      cy.get("button").click();
      cy.get("@clickFunctionMock").should("have.been.called");
    });

    it("should have a 'submit' type when a props is passed in", () => {
      cy.mount(<Button type="submit" />);
      cy.get('[type="submit"]').should("exist");
    });
  });

  describe("handling incorrect inputs", () => {
    it("should display 'button' as default text if no text props is passed in", () => {
      cy.mount(<Button />);
      cy.get("button").should("have.text", "button");
    });

    it("should still be a solid button if an incorrect input is passed as buttonStyle", () => {
      cy.mount(<Button buttonStyle="random-string" />);
      cy.get("button").should("have.class", "bg-blue-600");
    });
  });
});

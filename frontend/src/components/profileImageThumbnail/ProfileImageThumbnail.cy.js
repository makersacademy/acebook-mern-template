import ProfileImageThumbnail from './ProfileImageThumbnail';

describe("Profile Image Thumbnail", () => {
  it('contains an image', () => {
    cy.mount(<ProfileImageThumbnail user={
      {_id: 54321, displayName: "Perfect Person"}
    }/>);
    cy.get('[data-cy="profileImageThumbnail"]')
      .find('img')
      .should("have.attr", "alt")
      .then((alt) => {
        expect(alt).to.equal("Perfect Person");
      });
  });
});
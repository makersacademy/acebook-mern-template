var mongoose = require("mongoose");
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add('signup', (email, password, firstName, lastName, userName) => {
  cy.visit("/signup");
  cy.get("#email").type(email);
  cy.get("#password").type(password);
  cy.get("#firstName").type(firstName);
  cy.get("#lastName").type(lastName);
  cy.get("#userName").type(userName);
  cy.get("#submit").click();
})
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('clearDatabase', () => {

  const uri = 'mongodb://localhost:27017/acebook_test';

  // Esegui la cancellazione dei dati dalla collezione degli utenti
  mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    // Puoi eseguire altre operazioni dopo la connessione al database qui
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

    const db = client.db();
    const usersCollection = db.collection('users');

    usersCollection.deleteMany({}, (err, result) => {
      if (err) {
        console.error('Error deleting documents from users collection:', err);
        client.close();
        return;
      }

      console.log('Deleted documents from users collection:', result.deletedCount);
      client.close();
    });
  });
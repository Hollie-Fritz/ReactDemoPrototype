import ViewOrder from './ViewOrders';
import { Authenticator } from '@aws-amplify/ui-react';


describe('Test the ViewOrder functionality', () => {
  beforeEach(() => {
    cy.mount(
    <Authenticator.Provider>
        <ViewOrder/>
    </Authenticator.Provider>
    );
  })

  it('check everything is working in ui', () => {
    cy.get('[data-cy="customerName"]').contains(`Seth's Order`);
    cy.get('[data-cy="[phoneNumber]"]').should('have.value', '');
    cy.get('[data-cy="note"]').should('not.exist');
    cy.get('[data-cy="utensils"]').should('have.value', 'no');
    cy.get('[data-cy="utensils"]').should('have.value', '57.82');
  })

  it('check selections are working', () => {
    cy.get('input[type="text"]').as('inputText');
    cy.get('@inputText').type('no').type(Cypress._.repeat('{downArrow}{downArrow}', 1));
    cy.get('[data-cy="progressList"] li:nth-child(3)').should('have.class', 'Ready');
    cy.get('@inputText').type(Cypress._.repeat('{upArrow}', 1));
    cy.get('[data-cy="progresslist"] li:nth-child(2)').should('have.class', 'Preparing');
    cy.get('[data-cy="progresslist"] li:nth-child(1)').should('have.class', 'Order Placed');
    cy.get('[data-cy="progressList"] li:nth-child(2)').click();
    cy.get('input[type="text"]').should('have.length', 1);
  })

})
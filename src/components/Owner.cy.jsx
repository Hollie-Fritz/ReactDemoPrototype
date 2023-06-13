import Owner from "./Owner";
import { Authenticator } from '@aws-amplify/ui-react';

describe('Test the /owner page if the correct buttons show', () => {
    beforeEach(() => {
      cy.mount(
      <Authenticator.Provider>
          <Owner/>
      </Authenticator.Provider>
      );
    })
  
    it('check everything is existing /owner', () => {
      cy.get('[data-cy="welcomeName"]').should('have.value', 'Welcome, Seth!');
      cy.get('[data-cy="checkOrders"]').should('exist');
      cy.get('[data-cy="delete"]').should('exist');
      cy.get('[data-cy="edit"]').should('exist');
      cy.get('[data-cy="viewWebpage"]').should('exist');
      cy.get('[data-cy="create"]').should('not.exist');
    })
  })
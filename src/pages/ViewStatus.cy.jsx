import ViewStatus from './ViewStatus';
import { Authenticator } from '@aws-amplify/ui-react';


describe('Test the ViewStatus functionality', () => {
  beforeEach(() => {
    cy.mount(
    <Authenticator.Provider>
        <ViewStatus/>
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
})
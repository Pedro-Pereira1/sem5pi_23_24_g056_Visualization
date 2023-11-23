describe('Create Floor Page Test', function() {
    beforeEach(() => {

        cy.intercept('POST', 'http://localhost:4000/api/floors/createFloor', {
          statusCode: 201,
          body: {
            "floorID": "1",
            "floorNumber": "10",
            "floorDescription": "This is a description"
          }
        }).as('createFloor')

        cy.visit('/floors/createFloor')

    });

    it('has correct title', function() {
        cy.get('h1').should('contain', 'Create Floor')
    })

    it('fills and submits the form', function() {

        cy.get('#floorID').type('33');
        cy.get('#floorNumber').type('3');
        cy.get('#floorDescription').type('PL floor');
        cy.get('.form_select').select('B');
    
        cy.get('button:contains("Create")').click()

        cy.wait('@createFloor')

        cy.get('#floorID').should('have.value', '');
        cy.get('#floorNumber').should('have.value', '')
        cy.get('#floorDescription').should('have.value', '')
    })
    
      it('handles errors correctly', function() {
        cy.intercept('POST', '/api/floors/createFloor', { statusCode: 500, body: {} }).as('createFloorError')
        cy.visit('/floors/createFloor')
        cy.on('window:alert', (str) => {
          expect(str).to.include('An error occurred:')
        })
    })


   
  })
describe('Edit Elevator Test', function() {
    beforeEach(() => {

        cy.intercept('PUT', 'http://localhost:4000/api/elevators/edit', {
          statusCode: 201,
          body: 
            {
                "elevatorId": 1,
                "elevatorBrand": "Apple",
                "elevatorDescription": "um elevador",
                "elevatorModel": "iPhone",
                "elevatorSerialNumber": "string",
            }
        }).as('edit')

        cy.visit('/elevators/edit')

    });

    it('has correct title', function() {
        cy.get('h1').should('contain', 'Edit Elevator')
    })
    
    it('should display a button for searching for elevators', () => {
        cy.get('button:contains("Search")').should('be.visible');
    });

    it('fills and submits the form', function() {
        cy.get('select').select('A');
        cy.get('button:contains("Search")').click()
        cy.get('button:contains("Edit")').first().click()
        cy.get('#elevatorBrand').type('Brand');
        cy.get('#elevatorModel').type('Model');
        cy.get('#elevatorDescription').type('changed description');
        cy.get('#elevatorSerialNumber').type('X1');
        cy.get('button:contains("Submit")').first().click();

        cy.wait('@edit');
    })
    
    it('handles errors correctly', function() {
        cy.intercept('PUT', '/api/elevators/edit', { statusCode: 500, body: {} }).as('editElevatorError')
        cy.visit('/elevators/edit')
        cy.on('window:alert', (str) => {
          expect(str).to.include('An error occurred:')
        })
    })

  })
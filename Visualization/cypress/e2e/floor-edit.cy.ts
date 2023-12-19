describe('Edit Floor Page Test', function() {
    beforeEach(() => {

        cy.intercept('PUT', 'http://localhost:4000/api/floors/editFloor', {
          statusCode: 200,
          body: {
            "floorId": 11,
            "floorNumber": 3,
            "floorDescription": "Updated description",
            "floorMap": {
                "map": [],
                "passageways": [],
                "rooms": [],
                "elevators": [],
                "passagewaysCoords": [],
                "elevatorsCoords": [],
                "roomCoords": []
            }
        }
        }).as('editFloor')

        localStorage.setItem('token', 'something')
        cy.visit('/floors/editFloor')

    });

    it('has correct title', function() {
        cy.get('h1').should('contain', 'Edit Floor')
    })
    
    it('should display a button for searching for floors', () => {
        cy.get('button:contains("Search")').should('be.visible');
    });

    it('fills and submits the form', function() {
        cy.get('select').select('B');
        cy.get('button:contains("Search")').click()
        cy.get('button:contains("Edit")').first().click()
        cy.get('#floorNumber').clear().type('3');
        cy.get('#description').clear().type('Updated description');
        cy.get('button:contains("Submit")').first().click();
        cy.wait('@editFloor');
    })
    
    it('handles errors correctly', function() {
        cy.intercept('PUT', '/api/floors/editFloor', { statusCode: 500, body: {} }).as('editFloorError')
        cy.visit('/floors/editFloor')
        cy.on('window:alert', (str) => {
          expect(str).to.include('An error occurred:')
        })
    })

  })
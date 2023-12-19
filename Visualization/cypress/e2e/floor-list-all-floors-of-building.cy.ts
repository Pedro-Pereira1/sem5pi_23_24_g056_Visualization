describe('Floor List All Floor Page Test', function() {
    beforeEach(() => {
    
      cy.intercept('GET', 'http://localhost:4000/api/floors/listAllFloors/*', {
        statusCode: 200,
        body: [
            {
                "floorId": 11,
                "floorNumber": 1,
                "floorDescription": "T - Room",
                "floorMap": {
                    "map": [],
                    "passageways": [],
                    "rooms": [],
                    "elevators": [],
                    "passagewaysCoords": [],
                    "elevatorsCoords": [],
                    "roomCoords": []
                }
            },
            {
                "floorId": 22,
                "floorNumber": 2,
                "floorDescription": "Tp - Room",
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
        ]
      }).as('listAllFloors');  


        localStorage.setItem('token', 'something')
      cy.visit('/floors/listAllFloorsOfBuilding')
    });

    it('has correct title', function() {
        cy.get('h1').should('contain', 'List All Floors')
    })

    it('should display a select box for selecting a building', () => {
        cy.get('select').should('exist');

      });
    
      it('should display a button for searching for floors', () => {
        cy.get('button:contains("Search")').should('be.visible');
      });
    
    it('fills and submits the form', function() {

        cy.get('table').then(($table) => {
            const initialTableText = $table.text()
            cy.get('select').select('B');
            cy.get('button:contains("Search")').click()   
            cy.wait('@listAllFloors')

            cy.get('table').should('be.visible');
            cy.get('table thead tr th').should('have.length', 4);
            cy.get('table tbody tr').should('have.length', 2);

            cy.get('table tbody tr:first-child td.column1').contains('11');
            cy.get('table tbody tr:first-child td.column2').contains('1');
            cy.get('table tbody tr:first-child td.column3').contains('T - Room');

           
            cy.get('table').should(($tableAfter) => {
              expect($tableAfter.text()).not.to.eq(initialTableText)
            })
        })  
    })

      it('handles errors correctly', function() {
        cy.intercept('GET', '/api/floors', { statusCode: 500, body: {} }).as('getFloorsError')
        cy.visit('/floors/listAllFloors')
        cy.on('window:alert', (str) => {
          expect(str).to.include('`An error occurred:')
        })
      })

  })
describe('Floor List All Floors With Passageways Page Test', function() {
  beforeEach(() => {

    cy.intercept('GET', 'http://localhost:4000/api/floors/listFloorsPassageways/*', {
      statusCode: 200,
      body: [
        {
          "floorId": 2,
          "floorNumber": 2,
          "floorDescription": "floor",
          "floorMap": {
            "passageways": [2]
          },
          "floorsConnected": [5,"C"]
        },
        {
          "floorId": 3,
          "floorNumber": 3,
          "floorDescription": "floor",
          "floorMap": {
            "passageways": [1]
          },
          "floorsConnected": [5,"C"]
        }
      ]
    }).as('listFloorsPassageways');


        localStorage.setItem('token', 'something')
    cy.visit('/floors/listFloorsPassageways')
  });

  it('has correct title', function() {
    cy.get('h1').should('contain', 'List Floor Passageways')
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
      cy.get('select').select('A');
      cy.get('button:contains("Search")').click()
      cy.wait('@listFloorsPassageways')

      cy.get('table').should('be.visible');
      cy.get('table thead tr th').should('have.length', 5);
      cy.get('table tbody tr').should('have.length', 2);

      cy.get('table tbody tr:first-child td.column1').contains('2');
      cy.get('table tbody tr:first-child td.column2').contains('2');
      cy.get('table tbody tr:first-child td.column3').contains('floor');


      cy.get('table').should(($tableAfter) => {
        expect($tableAfter.text()).not.to.eq(initialTableText)
      })
    })
  })

  it('handles errors correctly', function() {
    cy.intercept('GET', '/api/floors', { statusCode: 500, body: {} }).as('getFloorsError')
    cy.visit('/floors/listFloorsPassageways')
    cy.on('window:alert', (str) => {
      expect(str).to.include('`An error occurred:')
    })
  })

})

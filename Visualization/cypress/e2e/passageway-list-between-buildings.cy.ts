describe('Passageway list between buildings', function () {
    beforeEach(() => {
      cy.visit('/auth/login')
        cy.request({
          method: 'POST',
          url: 'https://localhost:7094/api/users/login',
          body: {
            email: 'campusmanager@isep.ipp.pt',
            password: '123456789aA!'
          }
        })
        .then((resp) => {
          localStorage.removeItem('token');
          const token = JSON.stringify(resp.body.token);;
          localStorage.setItem('token', token);
        });
  
      cy.intercept('GET', 'http://localhost:4000/api/passageways/list/building1/A/building2/B', {
        statusCode: 200,
        body: [
            {
                "passagewayId": 1,
                "floorNumberBuilding1": 1,
                "floorNumberBuilding2": 1
            },
            {
                "passagewayId": 2,
                "floorNumberBuilding1": 2,
                "floorNumberBuilding2": 3
            },
        ]
      }).as('list');
  
  
      cy.visit('/passageways/list')
    });
  
    it('has correct title', function () {
      cy.get('h1').should('contain', 'List Passageways')
    })
  
    it('checks for listed passageways', function () {
  
      cy.get('table').then(($table) => {
        const initialTableText = $table.text()
        cy.get('select').eq(0).select('A');
        cy.get('select').eq(1).select('B');
        cy.get('button:contains("Search")').click()


        cy.get('table').should('be.visible');
        cy.get('table thead tr th').should('have.length', 3);
        cy.get('table tbody tr').should('have.length', 2);
  
        cy.get('table tbody tr:first-child td.column1').contains('1');
        cy.get('table tbody tr:first-child td.column2').contains('1');
        cy.get('table tbody tr:first-child td.column3').contains('1');

        cy.get('table').should(($tableAfter) => {
          expect($tableAfter.text()).not.to.eq(initialTableText)
        })
  
      })
    })
  
  
    it('handles building errors correctly', function () {
      cy.intercept('GET', '/api/buildings', { statusCode: 500, body: {} }).as('getBuildingsError')
      cy.visit('/elevators/listInBuilding')
      cy.on('window:alert', (str) => {
        expect(str).to.include('`An error occurred:')
      })
    })
    
})
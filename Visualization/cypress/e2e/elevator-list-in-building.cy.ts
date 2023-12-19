describe('Elevator list all', function () {
    beforeEach(() => {
  
      cy.intercept('GET', 'http://localhost:4000/api/elevators/listInBuilding/A', {
        statusCode: 200,
        body: [
            {
                "elevatorId": 1,
                "elevatorIdentificationNumber": 1,
                "elevatorBrand": "Apple",
                "elevatorDescription": "description",
                "elevatorModel": "Iphone",
                "elevatorSerialNumber": "x1",
                "floorsNumber": [
                    1,
                    2,
                    3
                ]
            },
            {
                "elevatorId": 2,
                "elevatorIdentificationNumber": 2,
                "elevatorBrand": "Samsung",
                "elevatorDescription": "description",
                "elevatorModel": "Galaxy",
                "elevatorSerialNumber": "x1",
                "floorsNumber": [
                    1,
                    2,
                    3
                ]
            },
        ]
      }).as('listInBuilding');
  
  
        localStorage.setItem('token', 'something')
      cy.visit('/elevators/listInBuilding')
    });
  
    it('has correct title', function () {
      cy.get('h1').should('contain', 'List Elevators In Buildings')
    })
  
    it('checks for listed elevators', function () {
  
      cy.get('table').then(($table) => {
        const initialTableText = $table.text()
        cy.get('select').select('A');
        cy.get('button:contains("Search")').click()

        cy.get('table').should('be.visible');
        cy.get('table thead tr th').should('have.length', 7);
        cy.get('table tbody tr').should('have.length', 2);
  
        cy.get('table tbody tr:first-child td.column1').contains('1');
        cy.get('table tbody tr:first-child td.column2').contains('Apple');
        cy.get('table tbody tr:first-child td.column3').contains('Iphone');
        cy.get('table tbody tr:first-child td.column4').contains('x1');
        cy.get('table tbody tr:first-child td.column5').contains('description');
        cy.get('table tbody tr:first-child td.column6').contains('1,2,3');
        cy.get('table tbody tr:first-child td.column7').contains('1');

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
    
    it('handles elevators errors correctly', function () {
        cy.intercept('GET', '/api/elevators', { statusCode: 500, body: {} }).as('getElevatorsError')
        cy.visit('/elevators/listInBuilding')
        cy.on('window:alert', (str) => {
          expect(str).to.include('`An error occurred:')
        })
      })
  })
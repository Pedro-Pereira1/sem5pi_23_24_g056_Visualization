describe('Robot list all', function () {
    beforeEach(() => {

        cy.intercept('GET', 'http://localhost:4000/api/robots/listAll', {
            statusCode: 200,
            body: [
                {
                    "code": "RBT001",
                    "nickname": "Rosie",
                    "type": "k4",
                    "serialNumber": "1234567890",
                    "description": "A friendly and helpful robot",
                    "operationStatus": true
                },
                {
                    "code": "RBT002",
                    "nickname": "Alex",
                    "type": "k4",
                    "serialNumber": "1234",
                    "description": "A friendly and helpful robot",
                    "operationStatus": true
                },
            ]
        }).as('listAll');


        cy.visit('/robots/listAll')
    });

    it('has correct title', function () {
        cy.get('h1').should('contain', 'List All Robots')
    })

    it('checks for listed elevators', function () {
        cy.get('table').then(($table) => {
            const initialTableText = $table.text()
            cy.wait('@listAll')

            cy.get('table').should('be.visible');
            cy.get('table thead tr th').should('have.length', 6);
            cy.get('table tbody tr').should('have.length', 2);

            cy.get('table tbody tr:first-child td.column1').contains('RBT001');
            cy.get('table tbody tr:first-child td.column2').contains('Rosie');
            cy.get('table tbody tr:first-child td.column3').contains('k4');
            cy.get('table tbody tr:first-child td.column4').contains('1234567890');
            cy.get('table tbody tr:first-child td.column5').contains('A friendly and helpful robot');
            cy.get('table tbody tr:first-child td.column6').contains('true');

            cy.get('table').should(($tableAfter) => {
                expect($tableAfter.text()).not.to.eq(initialTableText)
            })

        })
    })


    it('handles robot errors correctly', function () {
        cy.intercept('GET', '/api/robots', { statusCode: 500, body: {} }).as('getRobotsError')
        cy.visit('/robots/listAll')
        cy.on('window:alert', (str) => {
            expect(str).to.include('`An error occurred:')
        })
    })

})
describe('Inhibit robot', function () {
    let callCount = 0;

    beforeEach(() => {
        cy.visit('/auth/login')
        cy.request({
          method: 'POST',
          url: 'https://localhost:7094/api/users/login',
          body: {
            email: 'fleetmanager@isep.ipp.pt',
            password: '123456789aA!'
          }
        })
        .then((resp) => {
          localStorage.removeItem('token');
          const token = JSON.stringify(resp.body.token);;
          localStorage.setItem('token', token);
        });

        cy.intercept('GET', 'http://localhost:4000/api/robots/listAll', (req) => {
            callCount++;
            if (callCount === 1) {
                req.reply({
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
                            "nickname": "Bender",
                            "type": "k4",
                            "serialNumber": "0987654321",
                            "description": "A foul-mouthed robot",
                            "operationStatus": true
                        }
                    ]
                });
            } else if (callCount === 2) {
                req.reply({
                    statusCode: 200,
                    body: [
                        {
                            "code": "RBT001",
                            "nickname": "Rosie",
                            "type": "k4",
                            "serialNumber": "1234567890",
                            "description": "A friendly and helpful robot",
                            "operationStatus": false
                        },
                        {
                            "code": "RBT002",
                            "nickname": "Bender",
                            "type": "k4",
                            "serialNumber": "0987654321",
                            "description": "A foul-mouthed robot",
                            "operationStatus": true
                        }
                    ]
                });
            }
        }).as('listAll');


        cy.intercept('PATCH', 'http://localhost:4000/api/robots/inhibitRobot', {
            statusCode: 201,
            body: {
                "code": "RBT001",
                "nickname": "Rosie",
                "type": "k4",
                "serialNumber": "1234567890",
                "description": "A friendly and helpful robot",
                "operationStatus": false
            }
        }).as('inhibitRobot')

        cy.visit('/robots/inhibitRobot')
    });

    it('has correct title', function () {
        cy.get('h1').should('contain', 'Inhibit Robot')
    })


    it('fills and submits the form', function () {
        cy.get('button:contains("Inhibit")').first().click()

        cy.wait('@inhibitRobot')


        cy.wait('@listAll')

        cy.get('table').then(($table) => {
            cy.get('table tbody tr:first-child td.column6').contains('Disabled');
        })
    })

    it('handles errors correctly', function () {
        cy.intercept('PATCH', '/api/robots/inhibitRobot', { statusCode: 500, body: {} }).as('InhibitRobot')
        cy.visit('/robots/inhibitRobot')
        cy.on('window:alert', (str) => {
            expect(str).to.include('An error occurred:')
        })
    })

})
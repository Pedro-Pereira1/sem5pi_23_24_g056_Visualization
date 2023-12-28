describe('Building Edit', function () {

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

        cy.intercept('GET', 'http://localhost:4000/api/buildings/listAllBuildings', {
            statusCode: 200,
            body: [
                {
                    "buildingName": "A",
                    "buildingDescription": "T.I Building",
                    "buildingCode": "A",
                    "buildingLength": 10,
                    "buildingWidth": 10,
                    "buildingFloors": [
                        1,
                        2,
                        3,
                        4
                    ]
                },
                {
                    "buildingName": "B",
                    "buildingDescription": "Main Building",
                    "buildingCode": "B",
                    "buildingLength": 10,
                    "buildingWidth": 10,
                    "buildingFloors": [
                        11,
                        22,
                        33
                    ]
                }
            ]
        }).as('listAllBuildings');

        cy.intercept('PUT', 'http://localhost:4000/api/buildings/editBuilding', {
            statusCode: 200,
            body: [
                {
                    "buildingName": "C",
                    "buildingDescription": "Was Building A",
                    "buildingCode": "A",
                    "buildingLength": 20,
                    "buildingWidth": 10,
                    "buildingFloors": [
                    ]
                }
            ]
        }).as('editBuilding');
        cy.visit('/buildings/editBuilding')
    });

    it('has correct title', function () {
        cy.get('h1').should('contain', 'Edit Building')
    })

    it('fills and submits the form', function () {
        cy.get('button:contains("Edit")').first().click()
        cy.get('#name').type('C');
        cy.get('#description').type('Was building A');
        cy.get('#length').type('20');
        cy.get('#width').type('10');
        cy.get('button:contains("Submit")').first().click();

        cy.wait('@editBuilding');
    })

    it('handles errors correctly', function () {
        cy.intercept('GET', '/api/buildings', { statusCode: 500, body: {} }).as('getBuildingsError')
        cy.visit('/buildings/editBuilding')
        cy.on('window:alert', (str) => {
            expect(str).to.include('`An error occurred:')
        })
    })

})
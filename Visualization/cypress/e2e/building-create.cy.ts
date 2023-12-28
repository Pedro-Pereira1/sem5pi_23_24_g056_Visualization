describe('Building Create', function () {

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

        cy.intercept('POST', 'http://localhost:4000/api/buildings/createBuilding', {
            statusCode: 200,
            body: [
                {
                    "buildingName": "Building 1",
                    "buildingDescription": "Building 1 Description",
                    "buildingCode": "BGDT",
                    "buildingLength": 10,
                    "buildingWidth": 10,
                    "buildingFloors": [
                    ]
                }
            ]
        }).as('createBuilding');


        cy.visit('/buildings/createBuilding')
    });


    it('has correct title', function () {
        cy.get('h1').should('contain', 'Create Building')
    })

    it('Should display the text input fields', function () {
        cy.get('.form__field').each(($el, index, $list) => {
            cy.wrap($el).should('be.visible')
        })
    })

    it('fills and submits the form', function() {

        cy.get('#code').type('BGDT');
        cy.get('#name').type('Building 1');
        cy.get('#description').type('Building 1 Description');
        cy.get('#length').type('10');
        cy.get('#width').type('10');
    
        cy.get('button:contains("Submit")').click()

        cy.wait('@createBuilding')

        cy.get('#code').should('have.value', '');
        cy.get('#name').should('have.value', '')
        cy.get('#description').should('have.value', '')
        cy.get('#length').should('have.value', '')
        cy.get('#width').should('have.value', '')
    })

    it('handles errors correctly', function () {
        cy.intercept('GET', '/api/buildings', { statusCode: 500, body: {} }).as('getBuildingsError')
        cy.visit('/buildings/createBuilding')
        cy.on('window:alert', (str) => {
            expect(str).to.include('`An error occurred:')
        })
    })

})
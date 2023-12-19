describe('Elevator Create', function () {

    beforeEach(() => {
        cy.intercept('POST', 'http://localhost:4000/api/elevators/create', {
            statusCode: 200,
            body: 
                {
                    "elevatorId": 1,
                    "elevatorBrand": "Apple",
                    "elevatorDescription": "um elevador",
                    "elevatorModel": "iPhone",
                    "elevatorSerialNumber": "string",
                }
        }).as('create');


        localStorage.setItem('token', 'something')
        cy.visit('/elevators/create')
    });

    it('has correct title', function () {
        cy.get('h1').should('contain', 'Create Elevator')
    })

    it('Should display the text input fields', function () {
        cy.get('.form__field').each(($el, index, $list) => {
            cy.wrap($el).should('be.visible')
        })
    })

    it('fills and submits the form', function() {

        cy.get('#id').type('4');
        cy.get('#brand').type('Brand');
        cy.get('#model').type('Model');
        cy.get('#description').type('description');
        cy.get('#serialNumber').type('X1');
        cy.get('.form_select').select('A');
        cy.get('input[type="checkbox"]').first().check({force: true})
    
        cy.get('button:contains("Create")').click()

        cy.wait('@create')

        cy.get('#id').should('have.value', '');
        cy.get('#brand').should('have.value', '')
        cy.get('#model').should('have.value', '')
        cy.get('#description').should('have.value', '')
        cy.get('#serialNumber').should('have.value', '')


    })

    it('handles buildings errors correctly', function () {
        cy.intercept('GET', '/api/buildings', { statusCode: 500, body: {} }).as('getBuildingsError')
        cy.visit('/buildings/listBuildingsMaxMinFloors')
        cy.on('window:alert', (str) => {
            expect(str).to.include('`An error occurred:')
        })
    })

    it('handles floors errors correctly', function () {
        cy.intercept('GET', '/api/floors', { statusCode: 500, body: {} }).as('getFloorsError')
        cy.visit('/floors/listAllFloors')
        cy.on('window:alert', (str) => {
            expect(str).to.include('`An error occurred:')
        })
    })

})
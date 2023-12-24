describe('Create Backoffice User', function () {

    beforeEach(() => {
        cy.intercept('POST', 'https://localhost:7094/api/users/backoffice', {
            statusCode: 200,
            body:
            {
                "name": "Jose Gouveia",
                "email": "1211089@isep.ipp.pt",
                "phoneNumber": "912345678",
                "role": "Admin"
            }
        }).as('create');


        localStorage.setItem('token', 'something')
        cy.visit('/backoffice-user')
    });

    it('has correct title', function () {
        cy.get('h1').should('contain', 'Create Backoffice User')
    })

    it('should display a form', () => {
        cy.get('form').should('be.visible');
    });

    it('should display a text input field for entering the User name', () => {
        cy.get('input[id=name]').should('be.visible');
        cy.get('input[id=name]').should('have.attr', 'type', 'text');
    });

    it('should display a text input field for entering the User email', () => {
        cy.get('input[id=email]').should('be.visible');
        cy.get('input[id=email]').should('have.attr', 'type', 'text');
    });

    it('should display a text input field for entering the User phone number', () => {
        cy.get('input[id=phoneNumber]').should('be.visible');
        cy.get('input[id=phoneNumber]').should('have.attr', 'type', 'text');
    });

    it('should display a text input field for entering the User password', () => {
        cy.get('input[id=password]').should('be.visible');
        cy.get('input[id=password]').should('have.attr', 'type', 'password');
    });

    it('should display a select field for entering the User role', () => {
        cy.get('.form_select').should('be.visible');
    });

    it('should display a button for creating the user', () => {
        cy.get('button:contains("Create")').should('be.visible');
    });

    it('fills and submits the form', function () {

        cy.get('#email').type('1211089@isep.ipp.pt');
        cy.get('#name').type('Jose Gouveia');
        cy.get('#phoneNumber').type('912345678');
        cy.get('#password').type('Eusoujose11!');
        cy.get('.form_select').select('Admin');

        cy.get('button:contains("Create")').click()

        cy.wait('@create')

        cy.get('#email').should('have.value', '');
        cy.get('#name').should('have.value', '')
        cy.get('#phoneNumber').should('have.value', '')
        cy.get('#password').should('have.value', '')
        cy.get('.form_select').should('have.value', null)
    })
})
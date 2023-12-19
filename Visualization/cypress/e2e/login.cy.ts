describe('Login Page', function () {

    beforeEach(() => {
        cy.intercept('POST', 'http://localhost:7094/api/auth/login', {
            statusCode: 200,
            body: [{
                "token": "something"
            }]
        }).as('login');

        localStorage.removeItem('token');
        cy.visit('/auth/login')
    });

    it('has correct title', function () {
        cy.get('h1').should('contain', 'Login')
    })

    it('Should display the text input fields', function () {
        cy.get('.form__field').each(($el, index, $list) => {
            cy.wrap($el).should('be.visible')
        })
    })

    it('fills and submits the form', function() {

        cy.get('#email').type('1211089@isep.ipp.pt');
        cy.get('#password').type('123456789aA!');
    
        cy.get('button:contains("Submit")').click()

        cy.get('h2').should('contain', 'RobDroneGo')
    })

});
describe('Regist User Page Test', function () {
  beforeEach(() => {
    cy.intercept('POST', 'https://localhost:7094/api/users', {
      statusCode: 200,
      body: [
        {
          "name": "Jose Gouveia",
          "email": "1211089@isep.ipp.pt",
          "phoneNumber": "912345678",
          "taxPayerNumber": "123456789"
        }
      ]
    }).as('register');

    localStorage.removeItem('token')
    cy.visit('/auth/register')
  });

  it('has correct title', function () {
    cy.get('h1').should('contain', 'Create an account')
  })

  it('should display a form for creating a new User', () => {
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

  it('should display a text input field for entering the User tax payer number', () => {
    cy.get('input[id=taxPayerNumber]').should('be.visible');
    cy.get('input[id=taxPayerNumber]').should('have.attr', 'type', 'text');
  });

  it('should display a text input field for entering the User password', () => {
    cy.get('input[id=password]').should('be.visible');
    cy.get('input[id=password]').should('have.attr', 'type', 'password');
  });

  it('should display checkbox consent or not to the collection and processing of my personal data', () => {
    cy.get('input[type="checkbox"]').first().check({ force: true }).should('be.checked');
    cy.get('input[type="checkbox"]').first().uncheck({ force: true }).should('not.be.checked');
  });

  it('should display a button for creating the user', () => {
    cy.get('button:contains("Submit")').should('be.visible');
  });

  it('fills and submits the form', function () {

    cy.get('#email').type('1211089@isep.ipp.pt');
    cy.get('#name').type('Jose Gouveia');
    cy.get('#phoneNumber').type('912345678');
    cy.get('#taxPayerNumber').type('123456789');
    cy.get('#password').type('123456789aA!');

    cy.get('input[type="checkbox"]').first().check({ force: true }).should('be.checked');

    cy.get('button:contains("Submit")').click()

    cy.get('h1').should('contain', 'Login')
  })

})
describe('Regist User Page Test', function() {
  beforeEach(() => {

      //cy.intercept('POST', 'http://localhost:4000/api/robotTypes/createRobotType', {
      //  statusCode: 201,
      //  body: {
      //    "robotTypeID": "RT001",
      //    "robotBrand": "Acme Robotics",
      //    "robotModel": "RX-7",
      //    "availableTasks": [
      //        "Floor surveillance",
      //        "Object transport"
      //    ]
      //}
      //}).as('createRobotType')

      cy.visit('/auth/register')
  });

  it('has correct title', function() {
  })

  it('should display a form for creating a new User', () => {
  });

  it('should display a text input field for entering the User name', () => {
  });

  it('should display a text input field for entering the User email', () => {
  });

  it('should display a text input field for entering the User phone number', () => {
  });

  it('should display a text input field for entering the User tax payer number', () => {
  });

  it('should display a text input field for entering the User password', () => {
  });

  it('should display checkbox consent or not to the collection and processing of my personal data', () => {
    cy.get('input[type="checkbox"]').first().check({force: true}).should('be.checked');
    cy.get('input[type="checkbox"]').first().uncheck({force: true}).should('not.be.checked');
  });

  it('should display a button for creating the user', () => {
  });

  it('fills and submits the form', function() {
  })

  it('handles errors correctly', function() {
  })
 


 
})
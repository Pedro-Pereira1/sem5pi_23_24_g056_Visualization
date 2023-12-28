describe('Edit Passageway Page Test', function() {
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

    cy.intercept('PUT', 'http://localhost:4000/api/passageways/editPassageway', {
      statusCode: 201,
      body: {
        "passagewayId": 1,
        "floor1Id": 3,
        "floor2Id": 5
      }
    }).as('editPassageway')

    cy.visit('/passageways/editPassageway')

  });

  it('has correct title', function() {
    cy.get('h1').should('contain', 'Edit Passageway')
  })

  it('fills and submits the form', function() {
    cy.get('button:contains("Edit")').first().click()
    cy.get('#floor1Id').clear().type('4');
    cy.get('#floor2Id').clear().type('5');
    cy.get('button:contains("Save")').first().click();
    cy.wait('@editPassageway');
  })

  it('handles errors correctly', function() {
    cy.intercept('PUT', '/api/passageways/editPassageway', { statusCode: 500, body: {} }).as('editPassagewayError')
    cy.visit('/passageways/editPassageway')
    cy.on('window:alert', (str) => {
      expect(str).to.include('An error occurred:')
    })
  })

})

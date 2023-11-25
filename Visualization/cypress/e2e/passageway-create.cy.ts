describe('Create Passageway Page Test', function() {
  beforeEach(() => {

    cy.intercept('POST', 'http://localhost:4000/api/passageways/createPassageway', {
      statusCode: 201,
      body: {
        "passagewayId": 4,
        "building1Id": "A",
        "floor1Id": 1,
        "building2Id": "B",
        "floor2Id": 2
      }
    }).as('createPassageway')

    cy.visit('/passageways/createPassageway')

  });

  it('has correct title', function() {
    cy.get('h1').should('contain', 'Create Passageway')
  })

  it('fills and submits the form', function() {

    cy.get('#passagewayId').type('4');
    cy.get('#building1Id').type('A');
    cy.get('#floor1Id').type('1');
    cy.get('#building1Id').type('B');
    cy.get('#floor2Id').type('2');

    cy.get('button:contains("Create")').click()

    cy.wait('@createPassageway')

    cy.get('#passagewayId').should('have.value', '')
    cy.get('#floor1Id').should('have.value', '')
    cy.get('#floor2Id').should('have.value', '')
  })

  it('handles errors correctly', function() {
    cy.intercept('POST', '/api/passageways/createPassageway', { statusCode: 500, body: {} }).as('createPassagewayError')
    cy.visit('/passageways/createPassageway')
    cy.on('window:alert', (str) => {
      expect(str).to.include('An error occurred:')
    })
  })

})

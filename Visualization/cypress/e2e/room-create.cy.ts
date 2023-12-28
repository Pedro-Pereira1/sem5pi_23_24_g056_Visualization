describe('Create Room Page Test', function() {
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

    cy.intercept('POST', 'http://localhost:4000/api/rooms/createRoom', {
      statusCode: 201,
      body: {
        "roomName": "A101",
        "roomDescription": "This is a room",
        "roomCategory": "Other",
        "floorId": 1
      }
    }).as('createRoom')

    cy.visit('/rooms/createRoom')

  });

  it('has correct title', function() {
    cy.get('h1').should('contain', 'Create Room')
  })

  it('fills and submits the form', function() {

    cy.get('#roomName').type('B101');
    cy.get('#roomDescription').type('This is a room');
    cy.get('#roomCategory').type('Office');
    cy.get('#floorId').type('4');

    cy.get('button:contains("Create")').click()

    cy.wait('@createRoom')

    cy.get('#roomName').should('have.value', '')
    cy.get('#roomDescription').should('have.value', '')
    cy.get('#floorId').should('have.value', '')
  })

  it('handles errors correctly', function() {
    cy.intercept('POST', '/api/rooms/createRoom', { statusCode: 500, body: {} }).as('createRoomError')
    cy.visit('/rooms/createRoom')
    cy.on('window:alert', (str) => {
      expect(str).to.include('An error occurred:')
    })
  })

})

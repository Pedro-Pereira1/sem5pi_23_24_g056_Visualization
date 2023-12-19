describe('Create Robot Page Test', function() {
    beforeEach(() => {

        cy.intercept('POST', 'http://localhost:4000/api/robots/createRobot', {
          statusCode: 201,
          body: {
            "code": "RBT001",
            "nickname": "Rosie",
            "type": "k4",
            "serialNumber": "1234567890",
            "description": "A friendly and helpful robot",
            "operationStatus": true
        }
        }).as('createRobot')

        localStorage.setItem('token', 'something')
        cy.visit('/robots/createRobot')

    });

    it('has correct title', function() {
        cy.get('h1').should('contain', 'Create Robot')
    })

    it('should display a text input field for entering the robot code', () => {
        cy.get('input[id=Code]').should('be.visible');
        cy.get('input[id=Code]').should('have.attr', 'type', 'text');
    });
    
    it('should display a text input field for entering the robot nickname', () => {
        cy.get('input[id=Nickname]').should('be.visible');
        cy.get('input[id=Nickname]').should('have.attr', 'type', 'text');
    });
    
    it('should display a text input field for entering the robot serial number', () => {
        cy.get('input[id=SerialNumber]').should('be.visible');
        cy.get('input[id=SerialNumber]').should('have.attr', 'type', 'text');
    });
    
    it('should display a text input field for entering the robot description', () => {
        cy.get('input[id=Description]').should('be.visible');
        cy.get('input[id=Description]').should('have.attr', 'type', 'text');
    });
    
    it('should display a select box for selecting the robot type', () => {
        cy.get('select').should('exist');
    });
    
    it('should display a button for creating the robot', () => {
        cy.get('button:contains("Create")').should('be.visible');
    });

    it('fills and submits the form', function() {
        cy.get('input[id=Code]').type('RBT001');
        cy.get('input[id=Nickname]').type('Rosie');
        cy.get('input[id=SerialNumber]').type('1234567890');
        cy.get('input[id=Description]').type('A friendly and helpful robot');
        cy.get('select').select('k4');
        cy.get('button:contains("Create")').click();
        cy.wait('@createRobot')

        cy.get('input[id=Code]').should('have.value', '');
        cy.get('input[id=Nickname]').should('have.value', '')
        cy.get('input[id=SerialNumber]').should('have.value', '')
        cy.get('input[id=Description]').should('have.value', '')

    })
    
      it('handles errors correctly', function() {
        cy.intercept('POST', '/api/robots/createRobot', { statusCode: 500, body: {} }).as('createRobotError')
        cy.visit('/robots/createRobot')
        cy.on('window:alert', (str) => {
          expect(str).to.include('An error occurred:')
        })
    })


   
  })
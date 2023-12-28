describe('Create Robot Type Page Test', function() {
    beforeEach(() => {
        cy.visit('/auth/login')
        cy.request({
          method: 'POST',
          url: 'https://localhost:7094/api/users/login',
          body: {
            email: 'fleetmanager@isep.ipp.pt',
            password: '123456789aA!'
          }
        })
        .then((resp) => {
          localStorage.removeItem('token');
          const token = JSON.stringify(resp.body.token);;
          localStorage.setItem('token', token);
        });

        cy.intercept('POST', 'http://localhost:4000/api/robotTypes/createRobotType', {
          statusCode: 201,
          body: {
            "robotTypeID": "RT001",
            "robotBrand": "Acme Robotics",
            "robotModel": "RX-7",
            "availableTasks": [
                "Floor surveillance",
                "Object transport"
            ]
        }
        }).as('createRobotType')

        cy.visit('/robot-types/createRobotType')

    });

    it('has correct title', function() {
        cy.get('h1').should('contain', 'Create Robot Type')
    })

    it('should display a form for creating a new robot type', () => {
        cy.get('form').should('be.visible');
    });

    it('should display a text input field for entering the robot type ID', () => {
        cy.get('input[id=robotTypeID]').should('be.visible');
        cy.get('input[id=robotTypeID]').should('have.attr', 'type', 'text');
    });
    
    it('should display a text input field for entering the robot brand', () => {
        cy.get('input[id=robotBrand]').should('be.visible');
        cy.get('input[id=robotBrand]').should('have.attr', 'type', 'text');
    });
    
    it('should display a text input field for entering the robot model', () => {
        cy.get('input[id=robotModel]').should('be.visible');
        cy.get('input[id=robotModel]').should('have.attr', 'type', 'text');
    });
    
    it('should display two checkboxes for selecting the robot\'s tasks: Floor surveillance and Object transport', () => {
        cy.get('input[type="checkbox"]').first().check({force: true}).should('be.checked');
        cy.get('input[type="checkbox"]').first().uncheck({force: true}).should('not.be.checked');
        cy.get('input[type="checkbox"]').eq(1).check({force: true}).should('be.checked');
        cy.get('input[type="checkbox"]').eq(1).uncheck({force: true}).should('not.be.checked');
    });
    
    it('should display a button for creating the robot type', () => {
        cy.get('button:contains("Create")').should('be.visible');
    });

    it('fills and submits the form', function() {
        cy.get('input[id=robotTypeID]').type('RT001');
        cy.get('input[id=robotBrand]').type('Acme Robotics');
        cy.get('input[id=robotModel]').type('RX-7');
        cy.get('input[type="checkbox"]').first().check({force: true})
        cy.get('input[type="checkbox"]').eq(1).check({force: true})
        cy.get('button:contains("Create")').click();
        cy.wait('@createRobotType')

        cy.get('input[id=robotTypeID]').should('have.value', '');
        cy.get('input[id=robotBrand]').should('have.value', '');
        cy.get('input[id=robotModel]').should('have.value', '');
    })
    
      it('handles errors correctly', function() {
        cy.intercept('POST', '/api/robotTypes/createRobotType', { statusCode: 500, body: {} }).as('createRobotTypeError')
        cy.visit('/robot-types/createRobotType')
        cy.on('window:alert', (str) => {
          expect(str).to.include('An error occurred:')
        })
    })


   
  })
import { AuthServiceService } from './../../src/app/services/auth-service.service';

describe('Search Create', function () {

  beforeEach(() => {

    cy.intercept('GET', 'https://localhost:7094/api/users/taskManager@isep.ipp.pt', {
      statusCode: 200,
      body: {
        "name":"TaskManager",
        "email":"taskManager@isep.ipp.pt",
        "phoneNumber":"912345678",
        "taxPayerNumber":"999999999",
        "role":"TaskManager"
      }
    }).as('getUserInfo')
    
    cy.visit('/auth/login')
    cy.request({
      method: 'POST',
      url: 'https://localhost:7094/api/users/login',
      body: {
        email: 'taskmanager@isep.ipp.pt',
        password: '123456789aA!'
      }
    })
    .then((resp) => {
      localStorage.removeItem('token');
      const token = JSON.stringify(resp.body.token);;
      localStorage.setItem('token', token);
    });

      
    cy.visit('/tasks-backoffice/list/requests')  
  });

  it('has correct title', () => {
    cy.get('h1').should('contain', 'Task list');
  });

  it('should display task list form and tables', () => {
    cy.get('h1').should('contain.text', 'Task list');
    cy.get('form').should('exist');
    cy.get('table').should('exist');
  });

  it('should submit the form with valid data and display filtered results NUll parameters', () => {
    cy.get('button:contains("Search")').click()
    cy.get('table').then(($table) => {
      const initialTableText = $table.text()

      cy.get('button:contains("Search")').click()
      cy.on('window:alert', (str) => {
        expect(str).to.include('Tasks found:')
      })

    cy.get('table').should(($tableAfter) => {
      expect($tableAfter.text()).eq(initialTableText)
    })
  })
  });

  it('should submit the form with valid data and display filtered results Status', () => {
    cy.get('button:contains("Search")').click()
    cy.get('table').then(($table) => {
      const initialTableText = $table.text()
      cy.get('select').first().type('Approved');
      cy.get('button:contains("Search")').click()
      cy.on('window:alert', (str) => {
        expect(str).to.include('Tasks found:')
      })

    cy.get('table').should(($tableAfter) => {
      expect($tableAfter.text()).not.to.eq(initialTableText)
    })
  })
  });

  it('should submit the form with valid data and display filtered results Date', () => {
    cy.get('button:contains("Search")').click()
    cy.get('table').then(($table) => {
      const initialTableText = $table.text()

      cy.get('input[type="date"]').first().type('2021-06-01')
      cy.get('input[type="date"]').last().type('2021-06-30')
      cy.get('button:contains("Search")').click()
      cy.on('window:alert', (str) => {
        expect(str).to.include('Tasks found:')
      })

    cy.get('table').should(($tableAfter) => {
      expect($tableAfter.text()).not.to.eq(initialTableText)
    })
  })
  });

  it('should display surveillance tasks and pickup/delivery tasks tables', () => {
    cy.get('h3').should('contain.text', 'Survelliance Tasks');
    cy.get('h3').should('contain.text', 'Pickup And Delivery Tasks');
    cy.get('table').should('have.length', 2);
  });
  

})
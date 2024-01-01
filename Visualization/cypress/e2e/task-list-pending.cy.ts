describe('Task list all pending', function () {

  beforeEach(() => {
    cy.intercept('GET', 'https://localhost:7094/api/users/utente@isep.ipp.pt', {
      statusCode: 200,
      body: {
        "name":"TaskManager",
        "email":"taskmanager@isep.ipp.pt",
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

    cy.intercept('GET', 'http://localhost:4001/api/tasks/listPendingTasks', {
      statusCode: 200,
      body: [
        {
          "id": "123",
          "taskDescription": "Test Description",
          "taskType": "Floor surveillance",
          "taskPickupRoom": "B101",
          "taskDeliveryRoom": "B103",
          "taskBuilding": "B",
          "taskFloor": 11,
          "taskContact": "912913914",
          "taskRequester": "utente@isep.ipp.pt",
          "taskRequestDate": new Date()
        },
        {
          "id": "456",
          "taskDescription": "Test Description 2",
          "taskType": "Floor surveillance",
          "taskPickupRoom": "B102",
          "taskDeliveryRoom": "B201",
          "taskBuilding": "B",
          "taskFloor": 12,
          "taskContact": "912913914",
          "taskRequester": "utente@isep.ipp.pt",
          "taskRequestDate": new Date()
        }
      ]
    }).as('listPendingTasks');


    cy.visit('/tasks-backoffice/list/notApproved')
  });

  it('has correct title', function () {
    cy.get('h1').should('contain', 'Pending Tasks')
  })

  it('checks for listed pending tasks', function () {

    cy.get('table').then(($table) => {
      const initialTableText = $table.text()
      cy.wait('@listPendingTasks')

      cy.get('table tbody tr:first-child td.column1').contains('123');
      cy.get('table tbody tr:first-child td.column2').contains('Test Description');
      cy.get('table tbody tr:first-child td.column3').contains('utente@isep.ipp.pt');
      cy.get('table tbody tr:first-child td.column4').contains('Floor surveillance');

      cy.get('table tbody tr:nth-child(2) td.column1').contains('456');
      cy.get('table tbody tr:nth-child(2) td.column2').contains('Test Description 2');
      cy.get('table tbody tr:nth-child(2) td.column3').contains('utente@isep.ipp.pt');
      cy.get('table tbody tr:nth-child(2) td.column4').contains('Floor surveillance');

      cy.get('table').should(($tableAfter) => {
        expect($tableAfter.text()).not.to.eq(initialTableText)
      })

    })
  })

  it('handles errors correctly', function () {
    cy.intercept('GET', '/api/tasks', { statusCode: 500, body: {} }).as('taskOrError')
    cy.visit('/tasks/listPendingTasks')
    cy.on('window:alert', (str) => {
      expect(str).to.include('`An error occurred:')
    })
  })

})

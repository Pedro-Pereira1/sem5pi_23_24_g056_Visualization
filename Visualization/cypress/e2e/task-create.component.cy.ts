import { AuthServiceService } from './../../src/app/services/auth-service.service';

describe('Task Create', function () {

  beforeEach(() => {
    cy.intercept('GET', 'https://localhost:7094/api/users/utente@isep.ipp.pt', {
      statusCode: 200,
      body: {
        "name":"User",
        "email":"utente@isep.ipp.pt",
        "phoneNumber":"912345678",
        "taxPayerNumber":"912345678",
        "role":"Utente"
      }
    }).as('getUserInfo')
    
    cy.visit('/auth/login')
    cy.request({
      method: 'POST',
      url: 'https://localhost:7094/api/users/login',
      body: {
        email: 'utente@isep.ipp.pt',
        password: '123456789aA!'
      }
    })
    .then((resp) => {
      localStorage.removeItem('token');
      const token = JSON.stringify(resp.body.token);;
      localStorage.setItem('token', token);
    });

    cy.intercept('POST', 'http://localhost:4001/api/tasks/createTask',).as('createTask')

    //cy.request({
    //  method: 'GET',
    //  url: 'https://localhost:4000/api/rooms/listAllRooms',
    //})
      

    cy.visit('/tasks-users')  
  });

  it('has correct title', () => {
    cy.get('h1').should('contain', 'Create Task');
  });

  // Object Transport Form Tests
  it('should display a form for creating a new Object Transport task', () => {
    cy.get('#taskType').select('Object transport');
    cy.get('form').should('be.visible');
  });

  it('should display a text input field for entering the task description', () => {
    cy.get('#taskType').select('Object transport');
    cy.get('input[id=Description]').should('be.visible');
    cy.get('input[id=Description]').should('have.attr', 'type', 'text');
  });

  it('should display a dropdown for selecting the Pickup Room', () => {
    cy.get('#taskType').select('Object transport');
    cy.get('select[formControlName=PickupRoom]').should('be.visible');
  });

  it('should display a dropdown for selecting the Delivery Room', () => {
    cy.get('#taskType').select('Object transport');
    cy.get('select[formControlName=DeliveryRoom]').should('be.visible');
  });

  it('should display a text input field for entering the Pickup Contact', () => {
    cy.get('#taskType').select('Object transport');
    cy.get('input[id=PickupContact]').should('be.visible');
    cy.get('input[id=PickupContact]').should('have.attr', 'type', 'text');
  });

  it('should display a text input field for entering the Delivery Contact', () => {
    cy.get('#taskType').select('Object transport');
    cy.get('input[id=DeliveryContact]').should('be.visible');
    cy.get('input[id=DeliveryContact]').should('have.attr', 'type', 'text');
  });

  it('should display a text input field for entering the Pickup Code', () => {
    cy.get('#taskType').select('Object transport');
    cy.get('input[id=PickupCode]').should('be.visible');
    cy.get('input[id=PickupCode]').should('have.attr', 'type', 'number');
  });

  it('should display a button for creating the Object Transport task', () => {
    cy.get('#taskType').select('Object transport');
    cy.get('button:contains("Create")').should('be.visible');
  });

  it('should create an Object transport task', () => {
    cy.get('#taskType').select('Object transport');
    cy.get('#Description').type('Test Description');
    cy.get('select[formControlName=PickupRoom]').select('A201');
    cy.get('select[formControlName=DeliveryRoom]').select('B103');
    cy.get('#PickupContact').type('912913914');
    cy.get('#DeliveryContact').type('912913915');
    cy.get('#PickupCode').type('1234');
    cy.get('button:contains("Create")').click();
    cy.wait('@createTask')

    cy.get('#Description').should('have.value', '');
    cy.get('#PickupContact').should('have.value', '');
    cy.get('#DeliveryContact').should('have.value', '');
    cy.get('#PickupCode').should('have.value', '');
  });

  // Floor surveillance Form Tests
  it('should display a form for creating a new Floor surveillance task', () => {
    cy.get('#taskType').select('Floor surveillance');
    cy.get('form').should('be.visible');
  });

  it('should display a text input field for entering the task description', () => {
    cy.get('#taskType').select('Floor surveillance');
    cy.get('input[id=Description]').should('be.visible');
    cy.get('input[id=Description]').should('have.attr', 'type', 'text');
  });

  it('should display a dropdown for selecting the Building', () => {
    cy.get('#taskType').select('Floor surveillance');
    cy.get('select[formControlName=buildingCode]').should('be.visible');
  });

  it('should display a dropdown for selecting the Floor', () => {
    cy.get('#taskType').select('Floor surveillance');
    cy.get('select[formControlName=floorId]').should('be.visible');
  });

  it('should display a dropdown for selecting the Pickup Room', () => {
    cy.get('#taskType').select('Floor surveillance');
    cy.get('select[formControlName=PickupRoom]').should('be.visible');
  });

  it('should display a dropdown for selecting the Delivery Room', () => {
    cy.get('#taskType').select('Floor surveillance');
    cy.get('select[formControlName=DeliveryRoom]').should('be.visible');
  });

  it('should display a text input field for entering the Contact', () => {
    cy.get('#taskType').select('Floor surveillance');
    cy.get('input[id=Contact]').should('be.visible');
    cy.get('input[id=Contact]').should('have.attr', 'type', 'number');
  });

  it('should display a button for creating the Floor surveillance task', () => {
    cy.get('#taskType').select('Floor surveillance');
    cy.get('button:contains("Create")').should('be.visible');
  });

  it('should create an Floor surveillance task', () => {
    cy.get('#taskType').select('Floor surveillance');
    cy.get('#Description').type('Test Description');
    cy.get('select[formControlName=buildingCode]').select('B');
    cy.get('select[formControlName=floorId]').select('1');
    cy.get('select[formControlName=PickupRoom]').select('B101');
    cy.get('select[formControlName=DeliveryRoom]').select('B103');
    cy.get('#Contact').type('912913914');
    cy.get('button:contains("Create")').click();
    cy.wait('@createTask')

    cy.get('#Description').should('have.value', '');
    cy.get('#Contact').should('have.value', '');   
  });
  

})
import { AuthServiceService } from './../../src/app/services/auth-service.service';

describe('UserData Dowload Create', function () {

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

    cy.visit('/user-data')  
  });

  it('has correct title', function() {
    cy.get('h4').should('contain', 'Profile Settings');
  })

  it('should display a button for dowload the data', () => {
    cy.get('button:contains("Dowload My Personal Data")').should('be.visible');
  });

  it('dowloads data', function() {
    const dateTime1 = new Date().toLocaleString();
    const date1 = dateTime1.split(',')[0].replaceAll('/', '');
    const time1 = dateTime1.split(',')[1].replaceAll(':', '');
    const fileName1 = 'MyData_' + date1 +'T'+ time1 + '.json';
    cy.get('button:contains("Dowload My Personal Data")').should('be.visible').click();
    cy.wait('@getUserInfo')
    cy.readFile('cypress/downloads/' + fileName1).should('exist');
  })

})
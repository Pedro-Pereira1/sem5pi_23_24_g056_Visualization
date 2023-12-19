describe('Building list all', function () {
  beforeEach(() => {

    cy.intercept('GET', 'http://localhost:4000/api/buildings/listAllBuildings', {
      statusCode: 200,
      body: [
        {
          "buildingName": "A",
          "buildingDescription": "T.I Building",
          "buildingCode": "A",
          "buildingLength": 10,
          "buildingWidth": 10,
          "buildingFloors": [
            1,
            2,
            3,
            4
          ]
        },
        {
          "buildingName": "B",
          "buildingDescription": "Main Building",
          "buildingCode": "B",
          "buildingLength": 10,
          "buildingWidth": 10,
          "buildingFloors": [
            11,
            22,
            33
          ]
        }
      ]
    }).as('listAllBuildings');


        localStorage.setItem('token', 'something')
    cy.visit('/buildings/listAllBuildings')
  });

  it('has correct title', function () {
    cy.get('h1').should('contain', 'Buildings list')
  })

  it('checks for listed buildings', function () {

    cy.get('table').then(($table) => {
      const initialTableText = $table.text()
      cy.wait('@listAllBuildings')

      cy.get('table tbody tr:first-child td.column1').contains('A');
      cy.get('table tbody tr:first-child td.column2').contains('A');
      cy.get('table tbody tr:first-child td.column3').contains('T.I Building');
      cy.get('table tbody tr:first-child td.column4').contains('10');
      cy.get('table tbody tr:first-child td.column5').contains('10');
      cy.get('table tbody tr:first-child td.column6').contains('1,2,3,4');

      cy.get('table tbody tr:nth-child(2) td.column1').contains('B');
      cy.get('table tbody tr:nth-child(2) td.column2').contains('B');
      cy.get('table tbody tr:nth-child(2) td.column3').contains('Main Building');
      cy.get('table tbody tr:nth-child(2) td.column4').contains('10');
      cy.get('table tbody tr:nth-child(2) td.column5').contains('10');
      cy.get('table tbody tr:nth-child(2) td.column6').contains('11,22,33');

      cy.get('table').should(($tableAfter) => {
        expect($tableAfter.text()).not.to.eq(initialTableText)
      })

    })
  })


  it('handles errors correctly', function () {
    cy.intercept('GET', '/api/buildings', { statusCode: 500, body: {} }).as('getBuildingsError')
    cy.visit('/buildings/listAllBuildings')
    cy.on('window:alert', (str) => {
      expect(str).to.include('`An error occurred:')
    })
  })

})
describe('Load Floor map', function () {
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
          "buildingName": "BuldingA",
          "buildingDescription": "This is a test building",
          "buildingCode": "BGDA",
          "buildingLength": 10,
          "buildingWidth": 20,
          "buildingFloors": [
            11,
          ]
        }
      ]
    }).as('listAllBuildings');

    cy.intercept('GET', 'http://localhost:4000/api/floors/listAllFloors/*', {
      statusCode: 200,
      body: [
        {
          "floorId": 10,
          "floorNumber": 1,
          "floorDescription": "Salas Tps",
          "floorMap": {
            "map": [],
            "passageways": [],
            "rooms": [],
            "elevators": [],
            "passagewaysCoords": [],
            "elevatorsCoords": [],
            "roomCoords": []
          }
        },
      ]
    }).as('listAllFloors');


    cy.intercept('PATCH', 'http://localhost:4000/api/floors/loadFloorMap', {
      statusCode: 201,
      body: {
        "floorId": 22,
        "floorNumber": 2,
        "floorDescription": "Tp - Room",
        "floorMap": {
          "map": [
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
          ],
          "passageways": [],
          "rooms": [],
          "elevators": [],
          "passagewaysCoords": [],
          "elevatorsCoords": [],
          "roomCoords": []
        }
      }
    }).as('loadFloorMap')

        localStorage.setItem('token', 'something')
    cy.visit('/floors/loadFloorMap')
  })

  it('has correct title', function () {
    cy.get('h1').should('contain', 'Load Floor Map')
  })

  it('handles errors correctly', function () {
    cy.intercept('PATCH', 'http://localhost:4000/api/floors/loadFloorMap', { statusCode: 500, body: {} }).as('loadFloorMap')
    cy.visit('/floors/loadFloorMap')
    cy.on('window:alert', (str) => {
      expect(str).to.include('An error occurred:')
    })
  })

})



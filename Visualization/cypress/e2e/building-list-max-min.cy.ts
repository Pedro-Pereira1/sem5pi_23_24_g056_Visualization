describe('Building List Max Min Floor Page Test', function() {
    beforeEach(() => {
    
      cy.intercept('GET', 'http://localhost:4000/api/buildings/listBuildingsMaxMinFloors/*/*', {
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
              "buildingDescription": "Joi.string().max(255)",
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
      }).as('listBuildingMaxMinFloors');  


        localStorage.setItem('token', 'something')
      cy.visit('/buildings/listBuildingsMaxMinFloors')
    });

    it('has correct title', function() {
        cy.get('h1').should('contain', 'List Buildings by Max Min Floor')
    })

    it('has correct initial input values', function() {
        cy.get('.form__field').each(($el, index, $list) => {
          cy.wrap($el).should('have.value', '0')
        })
      })
    
      it('fills and submits the form', function() {

        cy.get('table').then(($table) => {
          const initialTableText = $table.text()

          cy.get('.form__field').first().clear().type('10')
          cy.get('.form__field').last().clear().type('5')
          cy.get('button:contains("Search")').click()

          cy.get('.form__field').first().should('have.value', '10')
          cy.get('.form__field').last().should('have.value', '5')

          cy.wait('@listBuildingMaxMinFloors')

          cy.get('table').should(($tableAfter) => {
            expect($tableAfter.text()).not.to.eq(initialTableText)
          })
        })
      })

      it('handles errors correctly', function() {
        cy.intercept('GET', '/api/buildings', { statusCode: 500, body: {} }).as('getBuildingsError')
        cy.visit('/buildings/listBuildingsMaxMinFloors')
        cy.on('window:alert', (str) => {
          expect(str).to.include('`An error occurred:')
        })
      })

  })
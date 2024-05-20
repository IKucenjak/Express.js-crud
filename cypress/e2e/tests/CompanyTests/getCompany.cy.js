describe('Check get company data functionality', () => {
let companyId;
let userId;

    before(() => {
        cy.createTestUser({})
        .then(response => {
            userId = response.body.user.id;
            cy.createTestCompany({created_by: userId})
            .then(response => {
                companyId = response.body.company.id;
            });
        });       
    })

    after(() => {
        cy.softDeleteTestUser(userId);
        cy.softDeleteTestCompany(companyId);
    })

    it('Check that you can get specific company data', () => {
        cy.request({
            method: 'GET',
            url: `${Cypress.env('base_url')}/api/companies/${companyId}`,
        }).then(response => {
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('id').that.includes(`${companyId}`);
        })
    })

    it('Check that you get an error message when getting a non-existing company', () => {
        cy.request({
            method: 'GET',
            url: `${Cypress.env('base_url')}/api/companies/${companyId}2`, //added a number to the 'id' so the id would be incorrect
            failOnStatusCode: false
        }).then(response => {
            expect(response.status).to.eq(400)
            expect(response.body.errors[0].msg).to.eq("Invalid company id.")
        })
    })

    // The test doesn't pass because the search function doesn't work
    it('Check that pagination returns right data (company with handle BMW)', () => {
        cy.request({
            method: 'GET',
            url: Cypress.env('base_url') + '/api/companies',
            qs: {
                page: '1',
                limit: '',
                search: 'BMW',
                sortField: 'created_at',
                sortOrder: 'DESC',
                filters: ''
            }
        }).then(response => {
            expect(response.status).to.eq(200)
            expect(response.body.users[0]?.handle).to.eq('BMW') 
        })   
    })
})
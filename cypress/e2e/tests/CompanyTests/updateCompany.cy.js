describe('Check update company data functionality', () => {
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

    it('Check that the update function updates company data', () => {
        cy.request({
            method: 'PUT',
            url: `${Cypress.env('base_url')}/api/companies/${companyId}`,
            body: {
                "handle": "Citro",
                "name": "Citroen",
                "country": "FR"
            }
        }).then(response => {
            expect(response.status).to.eq(200);
            expect(response.body.message).to.eq("Company updated successfully")
            expect(response.body.company).to.deep.include({
                "handle": "Citro",
                "name": "Citroen",
                "country": "FR"
            })    
        })
    })

    it('Check that the update function returns an error message when updating a non-existing company', () => {
        cy.request({
            method: 'PUT',
            url: `${Cypress.env('base_url')}/api/companies/${companyId}2`, // added a number to the 'id' so the id would be incorrect
            body: {
                "handle": "Citro",
                "name": "Citroen",
                "country": "FR"
            },
            failOnStatusCode: false
        }).then(response => {
            expect(response.status).to.eq(400)
            expect(response.body.errors[0].msg).to.eq("Invalid company id.")
        })
    })

    it("Check that the company data can't be updated when 'handle' field is empty", () => {
        cy.request({
            method: 'PUT',
            url: `${Cypress.env('base_url')}/api/companies/${companyId}`,
            body: {
                "handle": "",
                "name": "Citroen",
                "country": "FR"
            },
            failOnStatusCode: false
        }).then(response => {
            expect(response.status).to.eq(400)
            expect(response.body.errors[0].msg).to.eq("Handle is required.")
        })
    })

    it("Check that the company data can't be updated when 'name' field is empty", () => {
        cy.request({
            method: 'PUT',
            url: `${Cypress.env('base_url')}/api/companies/${companyId}`,
            body: {
                "handle": "Citro",
                "name": "",
                "country": "FR"
            },
            failOnStatusCode: false
        }).then(response => {
            expect(response.status).to.eq(400)
            expect(response.body.errors[0].msg).to.eq("Name is required.")
        })
    })

    it("Check that the company data can't be updated when 'country' field is empty", () => {
        cy.request({
            method: 'PUT',
            url: `${Cypress.env('base_url')}/api/companies/${companyId}`,
            body: {
                "handle": "Citro",
                "name": "Citroen",
                "country": ""
            },
            failOnStatusCode: false
        }).then(response => {
            expect(response.status).to.eq(400)
            expect(response.body.errors[0].msg).to.eq("Country is required.")
        })
    })
})
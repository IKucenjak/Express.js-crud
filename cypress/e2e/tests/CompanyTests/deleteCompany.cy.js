describe('Check delete company functionality', () => {
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

    it('Check that the user is successfully deleted', () => {
        cy.request({
            method: 'DELETE',
            url: `${Cypress.env('base_url')}/api/companies/${companyId}`,
        }).then(response => {
            expect(response.status).to.eq(200);
            expect(response.body.message).to.eq("Company successfully deleted");
        })
    })

    it("Check that the error message is returned when deleting a company with invalid 'id'", () => {
        cy.request({
            method: 'DELETE',
            url: `${Cypress.env('base_url')}/api/companies/${companyId}1`, // added a number to the 'id' so the id would be incorrect
            failOnStatusCode: false
        }).then(response => {
            expect(response.status).to.eq(400);
            expect(response.body.errors[0].msg).to.eq("Invalid company id.");
        })
    })
})
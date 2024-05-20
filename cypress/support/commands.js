// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


Cypress.Commands.add("createTestUser", (  
    {
        email = "asdf@gmail.com",
        first_name = "testName",
        last_name = "testSurname",
        password = "1234TestPass"
    }
    , failOnStatusCode = false) => {
    cy.request({
        method: 'POST',
        url: Cypress.env('base_url') + '/api/users',
        failOnStatusCode: failOnStatusCode,
        body: {
            "email": email,
            "first_name": first_name,
            "last_name": last_name,
            "password": password
        },
    }).then(response => {
        return response;
    })
})

// ova Commanda me malo muci, jer ne znam postoji li bolji nacin za dohvacanja/predaje "created_by"
Cypress.Commands.add("createTestCompany", (
    {
        handle = "BMW",
        name = "Bayerische Motoren Werke",
        website = "https://BMW.com",
        country = "DE",
        created_by = "" // nemam neku ideju kako da ovdje stavim userId
    }, 
    failOnStatusCode = false) => {
    cy.request({
        method: 'POST',
        url: Cypress.env('base_url') + '/api/companies',
        failOnStatusCode: failOnStatusCode,
        body: {
            "handle": handle,
            "name": name,
            "website": website,
            "country": country,
            "created_by": created_by
        }
    }).then(response => {
        return response;
    });
});


Cypress.Commands.add("softDeleteTestUser", (userId) => {
    cy.request({
        method: 'DELETE',
        url: `${Cypress.env('base_url')}/api/users/${userId}`
    })
})

Cypress.Commands.add("softDeleteTestCompany", (companyId) => {
    cy.request({
        method: 'DELETE',
        url: `${Cypress.env('base_url')}/api/companies/${companyId}`
    })
})

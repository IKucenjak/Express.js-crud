  let userId;
  describe('Check user creation functionality', () => {
    it('Check that the user can be created when valid data is given', () =>{
      cy.request({
        method: 'POST',
        url: Cypress.env('base_url') + '/api/users',
        body:{
          "email": "test1@yahoo.com",
          "first_name": "Petar",
          "last_name": "Perić",
          "password": "12345test"
        }
      }).then(response => {
        userId = response.body.user.id;
        expect(response.status).to.eq(201)
      })
    })

    after(() => {
      cy.request({
        method: 'DELETE',
        url: `${Cypress.env('base_url')}/api/users/${userId}`,
      })
    })

    it("Check that the user can not be created when the password doesn't contain enough characters", () =>{
      cy.request({
        method: 'POST',
        url: Cypress.env('base_url') + '/api/users',
        failOnStatusCode: false,
        body:{
          "email": "test@gmail.com",
          "first_name": "testName",
          "last_name": "testLastName",
          "password": "12"
        }
      }).then(response => {
        expect(response.status).to.eq(400)
        expect(response.body.errors[0].msg).to.eq("Password must contain 8 or more characters.");
      })
    });

    it("Check that the user can not be created when the last_name field is left empty", () =>{
      cy.request({
        method: 'POST',
        url: Cypress.env('base_url') + '/api/users',
        failOnStatusCode: false,
        body:{
          "email": "test@gmail.com",
          "first_name": "testName",
          "last_name": "",
          "password": "12345test"
        }
      }).then(response => {
        expect(response.status).to.eq(400)
        expect(response.body.errors[0].msg).to.eq("Last name is required");
      })
    });

    it("Check that the user can not be created when the first_name field is left empty", () =>{
      cy.request({
        method: 'POST',
        url: Cypress.env('base_url') + '/api/users',
        failOnStatusCode: false,
        body:{
          "email": "test@gmail.com",
          "first_name": "",
          "last_name": "testLastName",
          "password": "12345test"
        }
      }).then(response => {
        expect(response.status).to.eq(400)
        expect(response.body.errors[0].msg).to.eq("First name is required");
      })
    });

    it("Check that the user can not be created when the email field is left empty", () =>{
      cy.request({
        method: 'POST',
        url: Cypress.env('base_url') + '/api/users',
        failOnStatusCode: false,
        body:{
          "email": "",
          "first_name": "testName",
          "last_name": "testLastName",
          "password": "12345test"
        }
      }).then(response => {
        expect(response.status).to.eq(400)
        expect(response.body.errors[0].msg).to.eq("Invalid email address");
      })
    });

    it("Check that the user can not be created when the email doesn't have an '@' sign", () =>{
      cy.request({
        method: 'POST',
        url: Cypress.env('base_url') + '/api/users',
        failOnStatusCode: false,
        body:{
          "email": "asdf.ge",
          "first_name": "testName",
          "last_name": "testLastName",
          "password": "12345test"
        }
      }).then(response => {
        expect(response.status).to.eq(400)
        expect(response.body.errors[0].msg).to.eq("Invalid email address");
      })
    })

    it("Check that the user can not be created when the email doesn't contain a domain", () =>{
      cy.request({
        method: 'POST',
        url: Cypress.env('base_url') + '/api/users',
        failOnStatusCode: false,
        body:{
          "email": "asdf@",
          "first_name": "testName",
          "last_name": "testLastName",
          "password": "12345test"
        }
      }).then(response => {
        expect(response.status).to.eq(400)
        expect(response.body.errors[0].msg).to.eq("Invalid email address");
      })
    })
  })

  describe('Check getting user data functionality', () => {
    before(() => {
      return cy.request({
        method: 'POST',
        url: Cypress.env('base_url') + '/api/users',
        body: {
          "email": "test@update.hr",
          "first_name": "original",
          "last_name": "user",
          "password": "12345678test"
        },
      }).then(response => {
        userId = response.body.user.id;
      })
    })

    it('Check that you can get specific users data', () => {
      cy.request({
        method: 'GET',
        url: `${Cypress.env('base_url')}/api/users/${userId}`,
      }).then(response => {
        expect(response.status).to.eq(200)
        expect(response.body).to.have.property('id').that.includes(`${userId}`);
      })
    })

    it('Check that you get an error message when getting a non-existing user', () => {
      cy.request({
        method: 'GET',
        url: `${Cypress.env('base_url')}/api/users/${userId}2`, //added a number to the 'id' so the id would be incorrect
        failOnStatusCode: false
      }).then(response => {
        expect(response.status).to.eq(404)
        expect(response.body.error).to.eq("User not found");
      })    
    })
  })

  describe('Check pagination functionality', () => {
    it('Check that you can get all users named "Marko"', () => {
      cy.request({
        method: 'GET',
        url: Cypress.env('base_url') + '/api/users',
        qs: {
          page: '1',
          limit: '',
          search: 'Marko',
          sortField: 'created_at',
          sortOrder: 'DESC',
          filters: ''
        },
      }).then(response => {
        expect(response.status).to.eq(200)
        expect(response.body.users[0]?.first_name).to.eq('Marko')
      })
    })
  })

  describe('Check update user functionality', () => {
    before(() => {
      return cy.request({
        method: 'POST',
        url: Cypress.env('base_url') + '/api/users',
        body: {
          "email": "test@update.hr",
          "first_name": "original",
          "last_name": "user",
          "password": "12345678test"
        },
      }).then(response => {
        userId = response.body.user.id;
      })
    })

    it('Check that the update user data works', () => {
      cy.request({
        method: 'PUT',
        url: `${Cypress.env('base_url')}/api/users/${userId}`,
        body:{
          "email": "test2@update.hr",
          "first_name": "update",
          "last_name": "test",
        }
      }).then(response => {
        expect(response.status).to.eq(200);
        expect(response.body.message).to.eq("User updated successfully")
        expect(response.body.user).to.deep.include({
          "email": "test2@update.hr",
          "first_name": "update",
          "last_name": "test",
        })
      })
    })

    it("Check that the user data can't be changed when 'first_name' field is empty", () => {
      cy.request({
        method: 'PUT',
        url: `${Cypress.env('base_url')}/api/users/${userId}`,
        failOnStatusCode: false,
        body:{
          "email": "test2@update.hr",
          "first_name": "",
          "last_name": "test",
        }
      }).then(response => {
        expect(response.status).to.eq(400);
        expect(response.body.errors[0].msg).to.eq("First name is required");
      })
    })

    it("Check that the user data can't be changed when 'last_name' field is empty", () => {
      cy.request({
        method: 'PUT',
        url: `${Cypress.env('base_url')}/api/users/${userId}`,
        failOnStatusCode: false,
        body:{
          "email": "test2@update.hr",
          "first_name": "update",
          "last_name": "",
        }
      }).then(response => {
        expect(response.status).to.eq(400);
        expect(response.body.errors[0].msg).to.eq("Last name is required");
      })
    })

    it("Check that the user data can't be changed when 'email' field is empty", () => {
      cy.request({
        method: 'PUT',
        url: `${Cypress.env('base_url')}/api/users/${userId}`,
        failOnStatusCode: false,
        body:{
          "email": "",
          "first_name": "update",
          "last_name": "test",
        }
      }).then(response => {
        expect(response.status).to.eq(400);
        expect(response.body.errors[0].msg).to.eq("Invalid email address");
      })
    })

    it("Check that the user data can't be changed when 'email' field doesn't contain an '@' sign", () => {
      cy.request({
        method: 'PUT',
        url: `${Cypress.env('base_url')}/api/users/${userId}`,
        failOnStatusCode: false,
        body:{
          "email": "asdf.hr",
          "first_name": "update",
          "last_name": "test",
        }
      }).then(response => {
        expect(response.status).to.eq(400);
        expect(response.body.errors[0].msg).to.eq("Invalid email address");
      })
    })

    it("Check that the user data can't be changed when 'email' field doesn't contain a domain", () => {
      cy.request({
        method: 'PUT',
        url: `${Cypress.env('base_url')}/api/users/${userId}`,
        failOnStatusCode: false,
        body:{
          "email": "asdfag@",
          "first_name": "update",
          "last_name": "test",
        }
      }).then(response => {
        expect(response.status).to.eq(400);
        expect(response.body.errors[0].msg).to.eq("Invalid email address");
      })
    })
  })

  describe('Check delete user functionality', () => {
    before(() => {
      return cy.request({
        method: 'POST',
        url: Cypress.env('base_url') + '/api/users',
        body: {
          "email": "test@update.hr",
          "first_name": "original",
          "last_name": "user",
          "password": "12345678test"
        },
      }).then(response => {
        userId = response.body.user.id;
      })
    })

    it('Check that the user is successfully deleted', () => {
      cy.request({
        method: 'DELETE',
        url: `${Cypress.env('base_url')}/api/users/${userId}`,
      }).then(response => {
        expect(response.status).to.eq(200);
        expect(response.body.message).to.eq("User successfully deactivated");
      })
    })

    it("Check that the error message is returned when deleting a user with invalid 'id'", () => {
      cy.request({
        method: 'DELETE',
        url: `${Cypress.env('base_url')}/api/users/${userId}1`, //added a number to the 'id' so the id would be incorrect
      }).then(response => {
        expect(response.status).to.eq(404);
        expect(response.body.message).to.eq("User not found");
      })
    })
  })
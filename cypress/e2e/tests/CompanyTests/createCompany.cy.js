let userId;
let companyId;
describe('Check company creation functionality', () => {
  before(() => {
    cy.createTestUser({})
    .then(response => {
      userId = response.body.user.id;
    })
  })

  after(() => {
    cy.softDeleteTestUser(userId);
    cy.softDeleteTestCompany(companyId);
  })

  it('Check that the company can be created when valid data is given', () =>{
    cy.createTestCompany({created_by: userId})
    .then(response => {
      companyId = response.body.company.id;
      expect(response.status).to.eq(201)
      expect(response.body.message).to.eq("Company created successfully")
    })
  })

  it("Check that the company can't be created when the 'handle' field is left empty", () =>{
    cy.createTestCompany({handle: "", created_by: userId})
    .then(response => {
      expect(response.status).to.eq(400)
      expect(response.body.errors[0].msg).to.eq("Handle is required.");
    })
  });

  it("Check that the company can't be created when the 'name' field is left empty", () =>{
    cy.createTestCompany({name: "", created_by: userId})
    .then(response => {
      expect(response.status).to.eq(400)
      expect(response.body.errors[0].msg).to.eq("Name is required.");
    })
  });

  it("Check that the company can't be created when the 'website' field is left empty", () =>{
    cy.createTestCompany({website: "", created_by: userId})
    .then(response => {
      expect(response.status).to.eq(400)
      expect(response.body.errors[0].msg).to.eq("Invalid value");
      expect(response.body.errors[1].msg).to.eq("Website is required.");
    })
  });

  it("Check that the company can't be created when the 'country' field is left empty", () =>{
    cy.createTestCompany({country: "", created_by: userId})
    .then(response => {
      expect(response.status).to.eq(400)
      expect(response.body.errors[0].msg).to.eq("Country is required.");
    })
  });

  it("Check that the company can't be created when the 'created_by' field is left empty", () =>{
    cy.createTestCompany({created_by: ""})
    .then(response => {
      expect(response.status).to.eq(400)
      expect(response.body.errors[0].msg).to.eq("Invalid value");
      expect(response.body.errors[1].msg).to.eq("Created_by is not set or invalid.");
    })
  })
});
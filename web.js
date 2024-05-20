const express = require('express');
const bodyParser = require('body-parser');

const UserController = require('./controllers/UserController');
const UserValidation = require('./validations/UserValidation');

const CompanyController = require('./controllers/CompanyController');
const CompanyValidation = require('./validations/CompanyValidation');

const CompanyDepartmentController = require('./controllers/CompanyDepartmentController');
const CompanyDepartmentValidation = require('./validations/CompanyDepartmentValidation');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//User routes
app.post('/api/users', UserValidation.create, UserController.create);
app.get('/api/users/:user_id', UserController.show);
app.get('/api/users', UserController.paginated);
app.put('/api/users/:user_id', UserValidation.update, UserController.update);
app.delete('/api/users/:user_id', UserController.delete);

//Company routes
app.post('/api/companies', CompanyValidation.create, CompanyController.create);
app.get('/api/companies/:company_id',CompanyValidation.show, CompanyController.show);
app.get('/api/companies', CompanyController.paginated);
app.put('/api/companies/:company_id',CompanyValidation.update, CompanyController.update);
app.delete('/api/companies/:company_id',CompanyValidation.delete, CompanyController.delete);

//Department routes
app.post('/api/companies/:company_id/departments', CompanyDepartmentValidation.create, CompanyDepartmentController.create);
app.get('/api/companies/:company_id/departments/:department_id', CompanyDepartmentValidation.show, CompanyDepartmentController.show);
app.put('/api/companies/:company_id/departments/:department_id', CompanyDepartmentValidation.update, CompanyDepartmentController.update);
app.delete('/api/companies/:company_id/departments/:department_id', CompanyDepartmentValidation.delete, CompanyDepartmentController.delete);

app.get('/health', async (req, res) => {
  res.send('I am running.');
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  }
);

module.exports = app;

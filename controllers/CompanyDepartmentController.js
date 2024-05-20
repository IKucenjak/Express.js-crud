const CompanyDepartmentService = require('../services/CompanyDepartmentService');
const CompanyService = require('../services/CompanyService');
const UserService = require('../services/UserService');


class CompanyDepartmentController{
    async create(req, res) {
        try {
          const user = await UserService.show(req.body.created_by);
          if (!user) {
            return res.status(404).json({ errors: "User not found." });
          }
          const company = await CompanyService.show(req.params.company_id);
          if (!company) {
            return res.status(404).json({ errors: "Company not found" });
          }
          const result = await CompanyDepartmentService.create(req.params.company_id, req.body);
          return res.status(200).json(result);
        } catch (error) {
            console.log(error);
          return res.status(500).json({ error: 'Something went wrong.' });
        }
    }


    async show(req, res) {
        try {
            const department_id = req.params.department_id;
            const company_id = req.params.company_id;
            const department = await CompanyDepartmentService.show(company_id, department_id);
            console.log(company_id);
            console.log(department_id);
            console.log(department);


            if (!department) {
            res.status(404).json({ error: 'Company not found'});
            return;
            }

            res.status(200).json(department);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async update(req, res) {
        try {
          const department_id = req.params.department_id;
          const company_id = req.params.company_id;
          const { name } = req.body;
          const department_data = { name };
    
          const updatedDepartment = await CompanyDepartmentService.update(company_id, department_id, department_data);
    
          res.status(200).json({ message: 'Department updated successfully', department: updatedDepartment });
        } catch (error) {
          res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async delete(req, res) {
        try {
          const department_id = req.params.department_id;
          const company_id = req.params.company_id;

          await CompanyDepartmentService.delete(company_id, department_id);
    
          res.status(200).json({message: 'Department successfully deactivated'});
        } catch (error) {
          res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

module.exports = new CompanyDepartmentController();
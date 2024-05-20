const CompanyDepartment = require('../models/CompanyDepartment');

class CompanyDepartmentRepository{
    async create (company_id, department_data){
        return CompanyDepartment.store(company_id, department_data);
    };

    async show (company_id, department_id){
        return CompanyDepartment.show(company_id, department_id);
    };

    async update (company_id, department_id, department_data){
        return await CompanyDepartment.update(company_id, department_id, department_data);
    }

    async destroy (company_id, department_id){
        return await CompanyDepartment.delete(company_id, department_id);
    };
}

module.exports = new CompanyDepartmentRepository();
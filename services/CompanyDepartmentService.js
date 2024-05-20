const CompanyDepartmentRepository = require('../repositories/CompanyDepartmentRepository');

class CompanyDepartmentService{
    async create(company_id, department_data){
        const createdDepartment = await CompanyDepartmentRepository.create(company_id, department_data);
        return createdDepartment;
    }

    async show(company_id, department_id) {
        const department  = await CompanyDepartmentRepository.show(company_id, department_id);
        console.log(department);
        return department;
    }

    async update(company_id, department_id, department_data) {
        const updatedDepartment = await CompanyDepartmentRepository.update(company_id, department_id, department_data);
        return updatedDepartment;
    }

    async delete(company_id, department_id) {
        await CompanyDepartmentRepository.destroy(company_id, department_id);
    }
}

module.exports = new CompanyDepartmentService();
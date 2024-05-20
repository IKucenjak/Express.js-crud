const CompanyRepository = require('../repositories/CompanyRepository');

class CompanyService {

    async create(company_data){
        const createdCompany = await CompanyRepository.create(company_data);
        return createdCompany;
    }
    
    async show(company_id) {
        const company  = await CompanyRepository.show(company_id);
        return company;
    }

    async paginated(options) {
        const paginatedCompanies = await CompanyRepository.paginated(options);
        return paginatedCompanies;
    }

    async update(company_id, company_data) {
        const updatedCompany = await CompanyRepository.update(company_id, company_data);
        return updatedCompany;
    }

    async delete(company_id) {
        await CompanyRepository.destroy(company_id);
    }
}

module.exports = new CompanyService();
const Company = require('../models/Company');

class CompanyRepository{

    async create (company_data){
        return Company.store(company_data);
    };

    async show (company_id){
        return await Company.show(company_id);
    };

    async paginated (options){
        try {
            return await Company.paginated(options);
        } catch (error) {
            throw error;
        }
    };

    async update (company_id, company_data){
        return await Company.update(company_id, company_data);
    }

    async destroy (company_id){
        return await Company.delete(company_id);
    };
}


module.exports = new CompanyRepository();
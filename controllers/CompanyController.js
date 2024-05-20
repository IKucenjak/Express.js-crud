const CompanyService = require('../services/CompanyService');

class CompanyController{

    async create(req, res){
        try{
            const { handle, name, website, country, created_by } = req.body;
            const company_data = { handle, name, website, country, created_by };

            const createdCompany = await CompanyService.create(company_data);

            res.status(201).json({ message: 'Company created successfully', company: createdCompany});
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async show(req, res) {
        try {
            const company_id = req.params.company_id;
            const company = await CompanyService.show(company_id);

            if (!company) {
            res.status(404).json({ error: 'Company not found' });
            return;
            }

            res.status(200).json(company);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async paginated(req, res) {
        try {
          const { page, limit, search, sortField, sortOrder, filters } = req.query;
    
          const options = {
            page: parseInt(page) || 1,
            limit: parseInt(limit) || 10,
            search: search || '',
            sortField: sortField || 'created_at',
            sortOrder: sortOrder || 'DESC',
            filters: filters ? JSON.parse(filters) : {},
          };
    
          const paginatedCompanies = await CompanyService.paginated(options);
    
          res.status(200).json(paginatedCompanies);
        } catch (error) {
          res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async update(req, res) {
        try {
          const company_id = req.params.company_id;
          const { handle, name, website, country } = req.body;
          const company_data = { handle, name, website, country };
    
          const updatedCompany = await CompanyService.update(company_id, company_data);
    
          res.status(200).json({ message: 'Company updated successfully', company: updatedCompany });
        } catch (error) {
          res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async delete(req, res) {
        try {
          const company_id = req.params.company_id;
    
          await CompanyService.delete(company_id);
    
          res.status(200).json({message: 'Company successfully deleted'});
        } catch (error) {
          res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

module.exports = new CompanyController();
const { body, param, validationResult } = require('express-validator');

class CompanyDepartmentValidation{
    create(req,res,next) {      
        const validationRules = [
            body('name').notEmpty().withMessage('Department name is required.'),
            body('company_id').isUUID().withMessage('Company_id is required.'),
            body('created_by').isUUID().withMessage('Created_by is required.'),
        ];
        
        Promise.all(validationRules.map(rule => rule.run(req))).then(() => {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            next();
        });
    }

    show(req, res, next){
        const validationRules = [
            param('department_id').isUUID().withMessage('Invalid company id.'),
        ];

        Promise.all(validationRules.map(rule => rule.run(req))).then(() => {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            next();
        });
    }

    update(req, res, next){
        const validationRules = [
            param('department_id').isUUID().withMessage('Invalid company id.'),
            body('name').optional().notEmpty().withMessage('Department name is required.'),
            body('company_id').optional().isUUID().withMessage('Company_id is required.'),
        ];

        Promise.all(validationRules.map(rule => rule.run(req))).then(() => {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            next();
        });
    }

    delete(req, res, next){
        const validationRules = [
            param('department_id').isUUID().withMessage('Invalid company id.'),
        ];

        Promise.all(validationRules.map(rule => rule.run(req))).then(() => {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            next();
        });
    }
}

module.exports = new CompanyDepartmentValidation();
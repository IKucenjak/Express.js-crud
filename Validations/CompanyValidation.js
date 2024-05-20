const { body, param, validationResult } = require('express-validator');

class CompanyValidation{
    create(req,res,next) {      
        const validationRules = [
            body('handle').notEmpty().withMessage('Handle is required.'),
            body('name').notEmpty().withMessage('Name is required.'),
            body('website').isURL().notEmpty().withMessage('Website is required.'),
            body('country').notEmpty().withMessage('Country is required.'),
            body('created_by').isUUID().notEmpty().withMessage('Created_by is not set or invalid.'),
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
            param('company_id').isUUID().withMessage('Invalid company id.'),
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
            param('company_id').isUUID().withMessage('Invalid company id.'),
            body('handle').optional().notEmpty().withMessage('Handle is required.'),
            body('name').optional().notEmpty().withMessage('Name is required.'),
            body('website').optional().isURL().notEmpty().withMessage('Website is required.'),
            body('country').optional().notEmpty().withMessage('Country is required.'),
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
            param('company_id').isUUID().withMessage('Invalid company id.'),
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

module.exports = new CompanyValidation();
const { body, validationResult } = require('express-validator');

class UserValidation {
    create(req, res, next) {
        const validationRules = [
            body('first_name').notEmpty().withMessage('First name is required'),
            body('last_name').notEmpty().withMessage('Last name is required'),
            body('email').isEmail().withMessage('Invalid email address'),
            body('password').isLength({ min: 8}).withMessage('Password must contain 8 or more characters.'),
        ];

        Promise.all(validationRules.map(rule => rule.run(req))).then(() => {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            next();
        });
    }

    update(req, res, next) {
        const validationRules = [
            body('first_name').optional().notEmpty().withMessage('First name is required'),
            body('last_name').notEmpty().withMessage('Last name is required'),
            body('email').optional().isEmail().withMessage('Invalid email address'),
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

module.exports = new UserValidation();

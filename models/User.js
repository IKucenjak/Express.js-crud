const { DataTypes, Model, Op } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/db.config');

class User extends Model {

    static async store(user_data) {
        const { email, first_name, last_name, password } = user_data;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            email: email,
            first_name,
            last_name,
            password: hashedPassword,
        });
        return user;
    }
    
    static async show(user_id) {
        const user = await User.findByPk(user_id);
        return user;
    }
    
    static async paginated(options) {
        const { page = 1, limit = 10, search, sortField, sortOrder, filters } = options;
    
        const queryOptions = {
            offset: (page - 1) * limit,
            limit: limit,
            order: [[sortField, sortOrder]],
            where: filters,
        };
    
        if (search) {
            queryOptions.where = {
            [Op.or]: [
                { email: { [Op.iLike]: `%${search}%` } },
                { first_name: { [Op.iLike]: `%${search}%` } },
                { last_name: { [Op.iLike]: `%${search}%` } },
            ],
            ...filters,
            };
        }
    
        const paginatedUsers = await User.findAndCountAll(queryOptions);
    
        return {
            users: paginatedUsers.rows,
            total: paginatedUsers.count,
            totalPages: Math.ceil(paginatedUsers.count / limit),
        };
    }
    
    static async update(user_id, user_data) {
        const { email, first_name, last_name } = user_data;
        
        const user = await User.findByPk(user_id);
    
        if (!user) {
            return null;
        }
    
        const updatedUser = await user.update({
            email,
            first_name,
            last_name,
        });
    
        return updatedUser;
    }
    
    static async delete(user_id) {
        await User.destroy({ where: { id: user_id } });
    }
}

User.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: sequelize.UUID4,
            primaryKey: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        otp_secret: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        google_id: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        github_id: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        linkedin_id: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        locale: {
            type: DataTypes.STRING(5),
            allowNull: true,
        },
        timezone: {
            type: DataTypes.STRING(64),
            allowNull: true,
        },
        city_country: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        location: {
            type: DataTypes.GEOGRAPHY("POINT", 4326),
            allowNull: true,
        },
        phone: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        dob: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        workplace: {
            type: DataTypes.ARRAY(DataTypes.TEXT),
            allowNull: false,
            defaultValue: [],
        },
        gender: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        disability: {
            type: DataTypes.STRING,
            allowNull:true,
        },
        about: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        email_verified_at: {
            type: DataTypes.DATE,
            allowNull: true
        },
        notifications_read_at: {
            type: DataTypes.DATE,
            allowNull:false,
            defaultValue: DataTypes.NOW,
        },
        talent_onboarding_done: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        company_onboarding_done: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        culture_clan: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        culture_adhocracy: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        culture_hierarchy: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        culture_market: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        profile_picture: {
            type: DataTypes.JSONB,
            allowNull: true,
        },
        cover_picture: {
            type: DataTypes.JSONB,
            allowNull: true,
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.NOW,
            field: "created_at",
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.NOW,
            field: "updated_at",
        },
        deleted_at: {
            type: DataTypes.DATE,
            allowNull: true,
            field: "deleted_at",
        },
        deactivate_message: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        privacy_mode: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: "public",
        },
        tsq: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "",
        },
        freeze_message: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        admin_actions: {
            type: DataTypes.JSONB,
            allowNull: false,
            defaultValue: {},
        },
    }, 

    {
        sequelize,
        modelName: "user",
        tableName: "users",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        deletedAt: "deleted_at",
    }
);

module.exports = User;
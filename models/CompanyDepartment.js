const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db.config');


class CompanyDepartment extends Model {

    static associate(models) {
        CompanyDepartment.belongsTo(models.Company, {
          foreignKey: "company_id",
          onDelete: "CASCADE",
        });
    }

    static async store(company_id, department_data){
        const { name, created_by } = department_data;
        const department = await CompanyDepartment.create({ name, company_id, created_by });
        return department;

    }

    static async show(company_id, department_id) {
        const department = await CompanyDepartment.findOne({where: [{company_id: company_id }, { id: department_id }] });
        return department;
    }

    static async update(company_id, department_id, department_data) {
        const { name } = department_data;
        
        const department = await CompanyDepartment.findOne({where: [{company_id: company_id }, { id: department_id }] });
    
        if (!department) {
            return null;
        }
    
        const updatedDepartment = await department.update({
            name,
        });
    
        return updatedDepartment;
    }

    static async delete(company_id, department_id) {
        const department = await CompanyDepartment.findOne({where: [{company_id: company_id }, { id: department_id }] });
        await department.destroy();
        return department;
    }
}

CompanyDepartment.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        company_id: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        parent_id: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        created_by: {
            type: DataTypes.UUID,
            allowNull: false,
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
        archived_at: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        deleted_at: {
            type: DataTypes.DATE,
            allowNull: true,
            field: "deleted_at",
        },
    },
    {
        sequelize,
        modelName: "company_department",
        tableName: "company_departments",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        deletedAt: "deleted_at",
    }
);

module.exports = CompanyDepartment;
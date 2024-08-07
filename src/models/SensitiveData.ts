import { DataTypes, Model } from 'sequelize';
import sequelize from '../database';

class SensitiveData extends Model {
    public id!: string;
    public data!: string;
    public expiresAt!: Date;
}

SensitiveData.init(
    {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        data: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        expiresAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'SensitiveData',
    }
);

export default SensitiveData;

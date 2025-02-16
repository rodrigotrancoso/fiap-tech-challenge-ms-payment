'use strict';

import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/database.js';

class Payment extends Model { }

Payment.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        status: {
            type: DataTypes.ENUM('PENDING', 'APPROVED', 'FAILED'),
            allowNull: false
        },
        createdAt: {
            field: 'created_at',
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        updatedAt: {
            field: 'updated_at',
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    },
    {
        sequelize,
        modelName: 'Payment',
        tableName: 'payments',
        timestamps: true,
    }
);

export default Payment;
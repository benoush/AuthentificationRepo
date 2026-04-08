import { DataTypes ,Model, Optional, Sequelize } from "sequelize";

export interface PhotoAttributes {
    id: string;
    userId: string;
    url: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface PhotoCreationAttributes extends Optional<PhotoAttributes,"id"|"createdAt"|"updatedAt">{}

class Photo extends Model<PhotoAttributes, PhotoCreationAttributes> implements PhotoAttributes{
    declare id:string;
    declare userId:string;
    declare url:string;
    declare readonly createdAt?: Date ;
    declare readonly updatedAt?: Date ;
}

const initModelPhoto = (sequelize:Sequelize)=>{
   Photo.init(
        {
            id:{
                type:DataTypes.UUID,
                defaultValue:DataTypes.UUIDV4,
                primaryKey:true
            },
            userId:{
                type:DataTypes.UUID,
                allowNull:false,
                references:{
                    model:"users",
                    key:"id"
                }
                
            },
            url:{
                type:DataTypes.STRING,
                allowNull:false
            },
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE
        },
        {
            sequelize, 
            modelName: "Photo", 
            tableName: 'photos', 
            timestamps: true, 
            underscored: true, 
        }
    )
}

export {Photo,initModelPhoto};



import { DataTypes ,Model, Optional, Sequelize } from "sequelize";

export interface ArticleAttributes {
    id: string;
    titre: string;
    prix: number;
    quantite: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ArticleCreationAttributes extends Optional<ArticleAttributes,"id"|"createdAt"|"updatedAt">{}

class Article extends Model<ArticleAttributes, ArticleCreationAttributes> implements ArticleAttributes{
    declare id:string;
    declare titre:string;
    declare prix:number;
    declare quantite: number;
    declare readonly createdAt?: Date ;
    declare readonly updatedAt?: Date ;
}

const initModelArticles = (sequelize:Sequelize)=>{
    Article.init(
        {
            id:{
                type:DataTypes.UUID,
                defaultValue:DataTypes.UUIDV4,
                primaryKey:true
            },
            titre:{
                type:DataTypes.STRING,
                allowNull:false
            },
            prix:{
                type:DataTypes.INTEGER,
                allowNull:false
            },
            quantite:{
                type:DataTypes.INTEGER,
                allowNull:false
            }
        },
        {
            sequelize, 
            modelName: "Article", 
            tableName: 'articles', 
            timestamps: true, 
            underscored: true, 
            paranoid: true,
        }
    )
}

export {Article,initModelArticles};



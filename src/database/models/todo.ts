import { DataTypes ,Model, Optional, Sequelize } from "sequelize";
import { uuidv4 } from "zod";


export interface TodoAttributes {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  completedAt?: Date;
  createdAt?: Date;
  
}

export interface TodoCreationAttributes extends Optional<TodoAttributes,"id"|"completed"|"completedAt">{}

class Todo extends Model<TodoAttributes, TodoCreationAttributes> implements TodoAttributes{
    declare id:number;
    declare title:string;
    declare description: string;
    declare  completed: boolean ;
    declare  completedAt?: Date ;
}

const initModelTodo = (sequelize:Sequelize)=>{
    Todo.init(
        {
            id:{
                type:DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey:true
            },
            title:{
                type:DataTypes.STRING,
                allowNull:false
            },
            description:{
                type:DataTypes.STRING,
                allowNull:false
            },
            completed:{
                type:DataTypes.BOOLEAN,
                defaultValue: false
            },
            completedAt:{
                type:DataTypes.DATE,
                allowNull:true
            }
        },
        {
            sequelize, 
            modelName: "Todo", 
            tableName: 'todos', 
            timestamps: true, 
            underscored: true, 
            paranoid: true,
        }
    )
}

export {Todo,initModelTodo};




import { Model, ModelStatic } from "sequelize";
import { User } from "../../database/models/auth";
import { NotFoundError } from "../../common/errors/index";
import { z } from "zod";

export class UserRepository {
    private user: ModelStatic<User>

    constructor(){
        this.user = User;
    }

    async getUserById(id: string) {     
        return this.user.findByPk(id);
    }

    async getUserByEmail(email: string) {      
        return this.user.findOne({ where: { email } });
    }

    async getUserPaginated(page: number, limit: number) {
        const offset = (page - 1) * limit;
        return this.user.findAndCountAll({ offset, limit, });
    }

    async deleteUser(id: string){
        const user = await this.getUserById(id);
        if (!user)
            throw new NotFoundError("User");

        await user.destroy();
        return true;
    }
}

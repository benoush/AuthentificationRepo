
import { UserRepository } from "./userRepository";
//import { CreateArticleAttribute } from "./article.schema";
import { z } from "zod";


export class UserService {
    private userRepository: UserRepository;

    constructor(){
        this.userRepository = new UserRepository();
    }
    
   async getUserById(id: string) {
        // Validation : Est-ce un UUID valide ?
        const isUuid = z.string().uuid().safeParse(id);
        
        if (!isUuid.success) {
            // Au lieu de laisser Sequelize planter, on retourne null 
            // (ce qui provoquera une 404 propre au lieu d'une 500)
            return null; 
        }
        
        return await this.userRepository.getUserById(id);
    }

    async getUserByEmail(email: string) {
        // Même logique pour l'email
        const isEmail = z.string().email().safeParse(email);
        if (!isEmail.success) return null;

        return await this.userRepository.getUserByEmail(email);
    }
    async getUserPaginated(page: number, limit: number) {
        return await this.userRepository.getUserPaginated(page, limit);
    }
   
    async deleteUser(id: string){
        return await this.userRepository.deleteUser(id);    
    }
}
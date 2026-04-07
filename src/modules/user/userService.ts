
import { UserRepository } from "./userRepository";
//import { CreateArticleAttribute } from "./article.schema";
import { z } from "zod";


export class UserService {
    private userRepository: UserRepository;

    constructor(){
        this.userRepository = new UserRepository();
    }
    
   async getUserById(id: string) {
        return await this.userRepository.getUserById(id);
    }

    async getUserByEmail(email: string) {
        return await this.userRepository.getUserByEmail(email);
    }
    async getUserPaginated(page: number, limit: number) {
        return await this.userRepository.getUserPaginated(page, limit);
    }
   
    async deleteUser(id: string){
        return await this.userRepository.deleteUser(id);    
    }
}
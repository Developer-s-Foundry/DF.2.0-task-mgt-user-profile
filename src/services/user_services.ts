import { UserRepository } 
from "../repositories/user_repository";
import { updateDto } from "../dtos/user.dto";


export class UserService {
    private userRepo = new UserRepository()

    async updateProfile(email: string, data: updateDto) {
        return await this.userRepo.updateProfile(email, data);
        
    }
}
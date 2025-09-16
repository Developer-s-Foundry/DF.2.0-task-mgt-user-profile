// import the database cursor
import databaseConfig from "../common/config/database";
import { User } from "../models/userModel";
import { updateDto } from "../dtos/user.dto";

const userRepo = databaseConfig.getRepository(User);

export class UserRepository {

    // update profile of user
    async updateProfile(email: string, data: updateDto) {
        const user = await userRepo.findOneBy({ email: email})
        if (!user) {
            throw new Error('user not found')
        }
        Object.entries(data).forEach(([key, value]) => {
            (user as any)[key] = value
        })

        await userRepo.save(user)
        return user
    }
    
}
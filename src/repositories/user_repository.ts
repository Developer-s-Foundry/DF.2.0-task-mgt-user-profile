// import the database cursor


const userRepo = appDatasource.getRepository(User);

class UserRepository {

    // update profile of user
    async updateProfile() {
        const user = await userRepo.findOneBy({ id: 1})
        // update base
    }
    
}
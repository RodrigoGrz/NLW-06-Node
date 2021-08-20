import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository";
import { classToPlain } from 'class-transformer';

class ListUsersService {

    async execute() {
        const usersRepository = getCustomRepository(UsersRepository);

        const user = await usersRepository.find();

        return classToPlain(user);
    }
}

export { ListUsersService };
import { getCustomRepository } from "typeorm";
import { compare } from "bcryptjs";
import { UsersRepository } from "../repositories/UsersRepository";
import { sign } from "jsonwebtoken";

interface IAuthenticateRequest {
    email: string;
    password: string;
}

class AuthenticateUserService {

    async execute({ email, password }: IAuthenticateRequest) {
        const usersRepository = getCustomRepository(UsersRepository);

        const user = await usersRepository.findOne({
            email
        });

        if(!user) {
            throw new Error("Email/Password incorrect!");
        }

        const passwordMatch = await compare(password, user.password);

        if(!passwordMatch) {
            throw new Error("Email/Password incorrect!");
        }

        const token = sign({
            email: user.email
        }, "c972f4c8aece0448523b9454bb0ff87c", {
            subject: user.id,
            expiresIn: "1d"
        });

        return token;
    }
}

export { AuthenticateUserService };
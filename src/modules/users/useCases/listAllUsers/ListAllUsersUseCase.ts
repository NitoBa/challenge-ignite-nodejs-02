import { CustomError } from "../../../errors/customError";
import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class ListAllUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User[] {
    const userIsAdmin = this.usersRepository.findById(user_id);

    if (userIsAdmin && userIsAdmin.admin) {
      const users = this.usersRepository.list();
      return users;
    }

    throw new CustomError("User not is admin");
  }
}

export { ListAllUsersUseCase };

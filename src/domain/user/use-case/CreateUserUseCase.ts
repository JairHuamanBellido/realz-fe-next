import { HttpCreateUserDTO } from "@/src/infrastructure/user/model/HttpCreateUserDTO";
import { UserRepository } from "@/src/infrastructure/user/repository/UserRepository";
import { inject, injectable } from "inversify";

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject(UserRepository)
    private readonly _userRepository: UserRepository
  ) {}
  async execute(payload: HttpCreateUserDTO) {
    return await this._userRepository.createUser(payload);
  }
}

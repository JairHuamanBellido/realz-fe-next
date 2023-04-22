import { UserRepository } from "@/src/infrastructure/user/repository/UserRepository";
import { inject, injectable } from "inversify";
import { UserDomain } from "../model/UserDomain.model";
import { HttpError } from "@/src/core/http-errors/HttpError.model";

@injectable()
export class FindUserByIdUseCase {
  constructor(
    @inject(UserRepository)
    private readonly _userRepository: UserRepository
  ) {}

  async execute(id: string): Promise<UserDomain | HttpError> {
    return await this._userRepository.findById(id);
  }
}

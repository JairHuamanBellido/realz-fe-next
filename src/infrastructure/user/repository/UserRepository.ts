import { UserDomain } from "@/src/domain/user/model/UserDomain.model";
import { injectable } from "inversify";
import { HttpCreateUserDTO } from "../model/HttpCreateUserDTO";
import { httpClient } from "@/src/core/http-client";

@injectable()
export class UserRepository {
  async createUser(payload: HttpCreateUserDTO): Promise<UserDomain> {
    return await httpClient.post("/users", payload);
  }
}

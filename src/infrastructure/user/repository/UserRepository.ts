import { UserDomain } from "@/src/domain/user/model/UserDomain.model";
import { injectable } from "inversify";
import { HttpCreateUserDTO } from "../model/HttpCreateUserDTO";
import { httpClient } from "@/src/core/http-client";
import { HttpError } from "@/src/core/http-errors/HttpError.model";

@injectable()
export class UserRepository {
  async createUser(payload: HttpCreateUserDTO): Promise<UserDomain> {
    return await httpClient.post("/users", payload);
  }
  async findById(id: string): Promise<UserDomain | HttpError> {
    return await httpClient
      .get<UserDomain>(`/users/${id}`)
      .then((res) => res.data)
      .catch((e) => ({ error: true, message: e.response.data.message }));
  }
}

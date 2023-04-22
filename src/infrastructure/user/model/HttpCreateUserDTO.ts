import { EnumUserAuthenticatedMethod } from "@/src/domain/user/enum/user-authenticated-method.enum";

export interface HttpCreateUserDTO {
  readonly id: string;
  readonly name: string;
  readonly authenticated_method: EnumUserAuthenticatedMethod;
  readonly email: string;
}

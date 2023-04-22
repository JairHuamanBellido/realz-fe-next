import { EnumUserAuthenticatedMethod } from "../enum/user-authenticated-method.enum";

export interface UserDomain {
  readonly email: string;
  readonly id: string;
  readonly fullname: string;
  readonly authenticated_method: EnumUserAuthenticatedMethod;
}

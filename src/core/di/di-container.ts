import { UserRepository } from "@/src/infrastructure/user/repository/UserRepository";
import { Container } from "inversify";

const DIContainer = new Container();

DIContainer.bind<UserRepository>(UserRepository).toSelf();

export { DIContainer };

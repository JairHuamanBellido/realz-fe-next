import { ChatRoomRepository } from "@/src/infrastructure/chat-room/repository/ChatRoomRepository";
import { UserRepository } from "@/src/infrastructure/user/repository/UserRepository";
import { Container } from "inversify";

const DIContainer = new Container();

DIContainer.bind<UserRepository>(UserRepository).toSelf();
DIContainer.bind<ChatRoomRepository>(ChatRoomRepository).toSelf();
export { DIContainer };

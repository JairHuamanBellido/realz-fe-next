import "reflect-metadata";
import { DIContainer } from "@/src/core/di/di-container";
import { EnumUserAuthenticatedMethod } from "@/src/domain/user/enum/user-authenticated-method.enum";
import { CreateUserUseCase } from "@/src/domain/user/use-case/CreateUserUseCase";
import NextAuth, { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { FindUserByIdUseCase } from "@/src/domain/user/use-case/FindUserByIdUseCase";
export const authOptions: AuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_SECRET_ID || "",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      const isUserExist = await DIContainer.resolve(
        FindUserByIdUseCase
      ).execute(user.id);

      if ("error" in isUserExist) {
        await DIContainer.resolve(CreateUserUseCase).execute({
          id: user.id,
          authenticated_method: EnumUserAuthenticatedMethod.GITHUB,
          email: user.email ?? "",
          name: user.name ?? "",
        });
      }
      return true;
    },
    async redirect({ baseUrl }) {
      return baseUrl + "/lobby";
    },
  },
};
export default NextAuth(authOptions);

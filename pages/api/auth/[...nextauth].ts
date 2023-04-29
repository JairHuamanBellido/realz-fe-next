import "reflect-metadata";
import { DIContainer } from "@/src/core/di/di-container";
import { EnumUserAuthenticatedMethod } from "@/src/domain/user/enum/user-authenticated-method.enum";
import { CreateUserUseCase } from "@/src/domain/user/use-case/CreateUserUseCase";
import NextAuth, { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { FindUserByIdUseCase } from "@/src/domain/user/use-case/FindUserByIdUseCase";
import { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";
export const nexAuthOptions = (
  req: NextApiRequest,
  res: NextApiResponse
): AuthOptions => {
  return {
    providers: [
      GithubProvider({
        clientId: process.env.GITHUB_CLIENT_ID || "",
        clientSecret: process.env.GITHUB_SECRET_ID || "",
      }),
    ],
    secret: process.env.NEXTAUTH_SECRET,

    callbacks: {
      async signIn({ user }) {
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

        res.setHeader("Set-Cookie", [
          cookie.serialize("user_type", EnumUserAuthenticatedMethod.GITHUB, {
            httpOnly: true,
            secure: true,
            maxAge: 60 * 60 * 24,
            sameSite: "lax",
            path: "/",
          }),
          cookie.serialize("user_id", user.id, {
            httpOnly: true,
            secure: true,
            maxAge: 60 * 60 * 24,
            sameSite: "lax",
            path: "/",
          }),
        ]);

        return true;
      },
      async redirect({ baseUrl }) {
        return baseUrl + "/lobby";
      },
    },
  };
};
export default (req: NextApiRequest, res: NextApiResponse) => {
  return NextAuth(req, res, nexAuthOptions(req, res));
};

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import "reflect-metadata";
import { DIContainer } from "@/src/core/di/di-container";
import type { NextApiRequest, NextApiResponse } from "next";
import { CreateUserUseCase } from "@/src/domain/user/use-case/CreateUserUseCase";
import cookie from "cookie";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const createdUser = await DIContainer.resolve(CreateUserUseCase).execute(
    req.body
  );

  res.setHeader("Set-Cookie", [
    cookie.serialize("user_type", req.body["authenticated_method"], {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
    }),
    cookie.serialize("user_id", createdUser.id, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
    }),
  ]);
  res.status(200).json({ message: "user created" });
}

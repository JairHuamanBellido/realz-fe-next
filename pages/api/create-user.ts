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
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("user_type", req.body["authenticated_method"], {
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60,
      sameSite: "lax",
      path: "/",
    })
  );
  await DIContainer.resolve(CreateUserUseCase).execute(req.body);

  res.status(200).json({ message: "user created" });
}

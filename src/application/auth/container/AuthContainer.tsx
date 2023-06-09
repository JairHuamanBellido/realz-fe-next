"use client"
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import useCreateGuestUser from "../hooks/useCreateGuestUser";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { EnumUserAuthenticatedMethod } from "@/src/domain/user/enum/user-authenticated-method.enum";
import { signIn } from "next-auth/react";
import { clsx } from "clsx";
import Button from "@/src/shared/button";
import Loader from "@/src/shared/loader";
import Input from "@/src/shared/input";
export default function AuthContainer() {
  const [username, setUsername] = useState<string>("");

  const { mutate, isLoading, isSuccess } = useCreateGuestUser();
  const { replace } = useRouter();
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const id = uuidv4();

    mutate({
      id: id,
      email: id + "@example.com",
      authenticated_method: EnumUserAuthenticatedMethod.GUEST,
      name: username,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      replace("/lobby");
    }
  }, [isSuccess]);

  return (
    <div className="flex flex-col justify-center items-center w-full max-w-[800px] px-16 mx-auto h-full">
      <div className="w-full mb-36">
        <h1 className="text-white text-center  ">Realz</h1>
      </div>
      {isLoading || isSuccess ? (
        <div className="w-[36px] h-[36px] relative">
          <Loader gap={6} />
        </div>
      ) : (
        <div className="w-full flex flex-col items-center gap-x-4">
          <div className="w-full">
            <form
              className="flex flex-col items-start justify-start"
              onSubmit={onSubmit}
            >
              <label htmlFor="username" className="text-base text-white mb-2">
                Username
              </label>
              <Input
                name="username"
                type="text"
                required
                value={username}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setUsername(e.target.value)
                }
                placeholder="Username"
              />

              <Button variant="primary">Sign in as Guest User</Button>
            </form>
          </div>
          <div
            className={clsx(
              "h-[1px] w-full transparent-1 my-8 outline-none border-none "
            )}
          />
          <div className="i-ph-anchor-simple-thin" />

          <div className="w-full">
            <h3 className=" text-white mb-8 ">Login with Github!</h3>

            <Button
              className="flex items-center justify-center"
              variant="secondary"
              onClick={() => {
                signIn("github");
              }}
            >
              <div className="i-grommet-icons-github mr-2" />
              Sign in with Github
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

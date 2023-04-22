import { HttpCreateUserDTO } from "@/src/infrastructure/user/model/HttpCreateUserDTO";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export default function useCreateGuestUser() {
  const mutation = useMutation(
    async (payload: HttpCreateUserDTO) =>
      await axios.post("/api/create-user", payload)
  );

  return mutation;
}

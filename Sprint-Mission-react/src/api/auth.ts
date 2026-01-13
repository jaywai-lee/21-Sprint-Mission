import pandaAPIInstance from "./pandaApiInstance";
import { LoginRequest, LoginResponse, SignupRequest } from "../types/auth";

export async function loginApi(payload: LoginRequest): Promise<LoginResponse> {
  const { data } = await pandaAPIInstance.post<LoginResponse>(
    "/auth/signin",
    payload
  );
  return data;
}

export async function signup(payload: SignupRequest): Promise<void> {
  await pandaAPIInstance.post("/auth/signup", payload);
}

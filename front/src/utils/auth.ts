import { User } from "@/types/types";
import {
  deleteRequest,
  fetchError,
  getRequest,
  Result,
  resultFailure,
  resultSuccess,
} from "./request";
import axios, { isAxiosError } from "axios";

type TokenCheckResponse = {
  is_login: boolean;
  user: User | null;
  message: string | null;
};

export const registerHeader = (
  accessToken: string,
  client: string,
  uid: string
) => {
  sessionStorage.setItem("access-token", accessToken);
  sessionStorage.setItem("client", client);
  sessionStorage.setItem("uid", uid);
};

export const pickupHeader = () => {
  const accessToken = sessionStorage.getItem("access-token");
  const client = sessionStorage.getItem("client");
  const uid = sessionStorage.getItem("uid");
  return {
    headers: {
      "access-token": accessToken,
      client: client,
      uid: uid,
    },
  };
};

export const tokenCheck = async () => {
  if (sessionStorage.getItem("access-token") === null) {
    return null;
  }
  const res = getRequest<TokenCheckResponse>("/auth/sessions", {}, true);
  console.log(JSON.stringify(res));
  return (await res).success?.user;
};

const setHeaderRequest = async (
  name: string,
  password: string,
  signup: boolean
): Promise<Result<User>> => {
  const path = signup ? "/auth" : "/auth/sign_in";
  try {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL!}${path}`, {
      name: name,
      password: password,
    });
    registerHeader(
      res.headers["access-token"],
      res.headers["client"],
      res.headers["uid"]
    );
    return resultSuccess({
      id: res.data.data.id,
      name: res.data.data.name,
    });
  } catch (error) {
    if (isAxiosError(error)) {
      return resultFailure({
        message: error.message,
      });
    }
    return fetchError();
  }
};

export const signupRequest = async (name: string, password: string) => {
  return setHeaderRequest(name, password, true);
};

export const loginRequest = async (name: string, password: string) => {
  return setHeaderRequest(name, password, false);
};

export const logoutRequest = async () => {
  await deleteRequest("/auth/sign_out", true);
  sessionStorage.removeItem("access-token");
  sessionStorage.removeItem("client");
  sessionStorage.removeItem("uid");
};

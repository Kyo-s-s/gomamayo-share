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
import { destroyCookie, parseCookies, setCookie } from "nookies";

const cookiesOptions = {
  sameSite: "Strict",
  maxAge: 14 * 24 * 60 * 60,
  path: "/",
};

export const registerHeader = (
  accessToken: string,
  client: string,
  uid: string
) => {
  // sessionStorage.setItem("access-token", accessToken);
  // sessionStorage.setItem("client", client);
  // sessionStorage.setItem("uid", uid);
  setCookie(null, "access-token", accessToken, cookiesOptions);
  setCookie(null, "client", client, cookiesOptions);
  setCookie(null, "uid", uid, cookiesOptions);
};

const registerUser = (user: User) => {
  sessionStorage.setItem("user", JSON.stringify(user));
};

export const pickupHeader = () => {
  const cookies = parseCookies();
  const accessToken = cookies["access-token"];
  const client = cookies["client"];
  const uid = cookies["uid"];
  return {
    headers: {
      "access-token": accessToken,
      client: client,
      uid: uid,
    },
  };
};

type TokenCheckResponse = {
  is_login: boolean;
  user: User | null;
  message: string | null;
};

export const tokenCheck = async () => {
  const cookies = parseCookies();
  if (cookies["access-token"] == null) {
    return null;
  }
  const res = await getRequest<TokenCheckResponse>("/auth/sessions", {}, true);
  if (res.success?.is_login) {
    const user = {
      /* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
      id: res.success.user?.id!,
      name: res.success.user?.name!,
      /* eslint-enable @typescript-eslint/no-non-null-asserted-optional-chain */
    };
    registerUser(user);
    return user;
  } else {
    clearSession();
    return null;
  }
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
    const user: User = {
      id: res.data.data.id,
      name: res.data.data.name,
    };
    sessionStorage.setItem("user", JSON.stringify(user));
    return resultSuccess(user);
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
  clearSession();
};

const clearSession = () => {
  // sessionStorage.removeItem("access-token");
  // sessionStorage.removeItem("client");
  // sessionStorage.removeItem("uid");
  destroyCookie(null, "access-token");
  destroyCookie(null, "client");
  destroyCookie(null, "uid");
  sessionStorage.removeItem("user");
};

export const forceLogout = () => {
  clearSession();
  alert("セッションが切れました。再度ログインしてください。");
  window.location.href = "/login";
};

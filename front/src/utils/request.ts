import axios, { isAxiosError } from "axios";
import { forceLogout, pickupHeader } from "./auth";

export type RequestError = {
  message: string;
};

export type Result<T> =
  | {
      success: T;
      failure?: undefined;
    }
  | {
      success?: undefined;
      failure: RequestError;
    };

export const resultSuccess = <T>(inner: T): Result<T> => {
  return { success: inner, failure: undefined };
};

export const resultFailure = <T>(error: RequestError): Result<T> => {
  return { success: undefined, failure: error };
};

export const fetchError = <T>() => {
  return resultFailure<T>({
    message: "Fetch Error",
  });
};

const console_log = (message: string) => {
  if (process.env.NEXT_PUBLIC_IS_DEV === "true") {
    console.log(message);
  }
};

const createHeaders = (withAuth: boolean) => {
  const base = { withCredentials: true };
  return withAuth ? { ...base, ...pickupHeader() } : base;
};

const errorHandle = <T>(error: unknown): Result<T> => {
  if (isAxiosError(error)) {
    if (error.response?.status === 401) {
      forceLogout();
    }
    return resultFailure({
      message: error.message,
    });
  }
  return fetchError();
};

export const getRequest = async <T>(
  url: string,
  data: Record<string, string> = {},
  withAuth = false
): Promise<Result<T>> => {
  try {
    const params = Object.entries(data)
      .map(([key, value]) => `${key}=${value}`)
      .join("&");
    console_log(`GET: ${process.env.NEXT_PUBLIC_API_URL!}${url}?${params}`);
    const response = await axios.get<T>(
      `${process.env.NEXT_PUBLIC_API_URL!}${url}?${params}`,
      createHeaders(withAuth)
    );
    return resultSuccess(response.data);
  } catch (error) {
    return errorHandle(error);
  }
};

export const postRequest = async <T>(
  url: string,
  data: object = {},
  withAuth = false
): Promise<Result<T>> => {
  try {
    console_log("POST: " + process.env.NEXT_PUBLIC_API_URL! + url);
    const response = await axios.post<T>(
      `${process.env.NEXT_PUBLIC_API_URL!}${url}`,
      data,
      createHeaders(withAuth)
    );
    return resultSuccess(response.data);
  } catch (error) {
    return errorHandle(error);
  }
};

export const deleteRequest = async <T>(
  url: string,
  withAuth = false
): Promise<Result<T>> => {
  try {
    console_log("DELETE: " + process.env.NEXT_PUBLIC_API_URL! + url);
    const response = await axios.delete<T>(
      `${process.env.NEXT_PUBLIC_API_URL!}${url}`,
      createHeaders(withAuth)
    );
    return resultSuccess(response.data);
  } catch (error) {
    return errorHandle(error);
  }
};

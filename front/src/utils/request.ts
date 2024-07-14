import axios, { isAxiosError } from "axios";

type RequestError = {
  message: string;
};

type Result<T> =
  | {
      success: T;
      failure?: undefined;
    }
  | {
      success?: undefined;
      failure: RequestError;
    };

const resultSuccess = <T>(inner: T): Result<T> => {
  return { success: inner, failure: undefined };
};

const resultFailure = <T>(error: RequestError): Result<T> => {
  return { success: undefined, failure: error };
};

const fetchError = <T>() => {
  return resultFailure<T>({
    message: "Fetch Error",
  });
};

export const getRequest = async <T>(url: string): Promise<Result<T>> => {
  try {
    console.log("GET: " + process.env.NEXT_PUBLIC_API_URL! + url);
    const response = await axios.get<T>(
      process.env.NEXT_PUBLIC_API_URL! + url,
      { withCredentials: true } // ?
    );
    return resultSuccess(response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return resultFailure({
        message: error.message,
      });
    }
    return fetchError();
  }
};

export const postRequest = async <T>(
  url: string,
  data: object
): Promise<Result<T>> => {
  try {
    console.log("POST: " + process.env.NEXT_PUBLIC_API_URL! + url);
    const response = await axios.post<T>(
      process.env.NEXT_PUBLIC_API_URL! + url,
      data,
      { withCredentials: true } // ?
    );
    return resultSuccess(response.data);
  } catch (error) {
    if (isAxiosError(error)) {
      return resultFailure({
        message: error.message,
      });
    }
    return fetchError();
  }
};

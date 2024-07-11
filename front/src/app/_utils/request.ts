type RequestError = {
  status: number;
  error: string;
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

export const postRequest = async <T>(
  url: string,
  data: object
): Promise<Result<T>> => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_URL! + url,
      options
    );
    if (response.ok) {
      return resultSuccess((await response.json()) as T);
    } else {
      return resultFailure((await response.json()) as RequestError);
    }
  } catch (error) {
    return resultFailure({
      status: -1,
      error: "Fetch Error",
    });
  }
};

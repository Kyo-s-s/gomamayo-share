import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";

const useRedirect = () => {
  const router = useRouter();
  const redirectTo = useCallback(
    (url: string) => {
      router.push(url);
    },
    [router]
  );
  return redirectTo;
};

export default useRedirect;

export const useRedirectIfLoggedIn = (url = "/posts") => {
  const { user } = useAuth();
  const redirectTo = useRedirect();
  useEffect(() => {
    if (user) {
      redirectTo(url);
    }
  }, [user, redirectTo, url]);
};

export const useRedirectIfNotLoggedIn = (url = "/signup") => {
  const { user } = useAuth();
  const redirectTo = useRedirect();
  useEffect(() => {
    if (!user) {
      redirectTo(url);
    }
  }, [user, redirectTo, url]);
};

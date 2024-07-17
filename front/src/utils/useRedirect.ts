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

  const redirectIfLoggedIn = useCallback(
    (url = "/posts") => {
      const { user } = useAuth();
      useEffect(() => {
        if (user) {
          router.push(url);
        }
      }, [user, router]);
    },
    [router]
  );

  const redirectIfNotLoggedIn = useCallback(
    (url = "/signup") => {
      const { user } = useAuth();
      useEffect(() => {
        if (!user) {
          router.push(url);
        }
      }, [user, router]);
    },
    [router]
  );

  return { redirectTo, redirectIfLoggedIn, redirectIfNotLoggedIn };
};

export default useRedirect;

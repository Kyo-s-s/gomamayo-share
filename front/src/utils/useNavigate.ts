import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";

const useNavigate = () => {
  const router = useRouter();
  const navigateTo = useCallback(
    (url: string) => {
      router.push(url);
    },
    [router]
  );
  return navigateTo;
};

export default useNavigate;

export const useRedirectIfLoggedIn = (redirectTo = "/posts") => {
  const { user } = useAuth();
  const navigateTo = useNavigate();
  useEffect(() => {
    if (user) {
      navigateTo(redirectTo);
    }
  }, [user]);
};

export const useRedirectIfNotLoggedIn = (redirectTo = "/signup") => {
  const { user } = useAuth();
  const navigateTo = useNavigate();
  useEffect(() => {
    if (!user) {
      navigateTo(redirectTo);
    }
  }, [user]);
};

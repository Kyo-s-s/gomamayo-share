import { useRouter } from "next/router";
import { useCallback } from "react";

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

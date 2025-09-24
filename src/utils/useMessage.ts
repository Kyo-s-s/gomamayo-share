import { useToast, UseToastOptions } from "@chakra-ui/react";
import { useCallback } from "react";

const useMessage = () => {
  const toast = useToast();

  const successMessage = useCallback(
    ({
      description,
      duration = 1000,
      position = "top",
      isClosable = true,
    }: UseToastOptions) => {
      toast({
        title: "Success!",
        status: "success",
        description: description,
        duration: duration,
        position: position,
        isClosable: isClosable,
      });
    },
    [toast]
  );

  const errorMessage = useCallback(
    ({
      description,
      duration = 3000,
      position = "top",
      isClosable = true,
    }: UseToastOptions) => {
      toast({
        title: "Error!",
        status: "error",
        description: description,
        duration: duration,
        position: position,
        isClosable: isClosable,
      });
    },
    [toast]
  );

  return { successMessage, errorMessage };
};

export default useMessage;

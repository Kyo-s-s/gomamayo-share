import { FormLabel, Heading, Input } from "@chakra-ui/react";
import { Button } from "./custom";

export const Form = ({
  title,
  onSubmit,
  children,
  isInvalid = false,
}: {
  title: React.ReactNode;
  onSubmit: () => void;
  children?: React.ReactNode;
  isInvalid?: boolean;
}) => {
  return (
    <>
      <Heading>{title}</Heading>
      {children}
      <Button isDisabled={isInvalid} mt={4} onClick={onSubmit}>
        確定
      </Button>
    </>
  );
};

// TODO: Error message
export const StringForm = ({
  title,
  value,
  setValue,
  isPassword = false,
  isInvalid = false,
}: {
  title: string;
  value: string;
  setValue: (s: string) => void;
  isPassword?: boolean;
  isInvalid?: boolean;
}) => {
  return (
    <>
      <FormLabel my={2}>{title}</FormLabel>
      <Input
        type={isPassword ? "password" : "text"}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        isInvalid={isInvalid}
      />
    </>
  );
};

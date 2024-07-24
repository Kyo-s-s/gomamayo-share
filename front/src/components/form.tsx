import {
  Card,
  CardBody,
  CardHeader,
  Flex,
  FormLabel,
  Heading,
  Input,
  Spacer,
  Textarea,
  Tooltip,
} from "@chakra-ui/react";
import { Button } from "./custom";

export const Form = ({
  title,
  onSubmit,
  children,
  isInvalid = false,
  submitButton = "確定",
}: {
  title: React.ReactNode;
  onSubmit: () => void;
  children?: React.ReactNode;
  isInvalid?: boolean;
  submitButton?: string;
}) => {
  return (
    <Card borderRadius="15px">
      <CardHeader pb={0}>
        <Heading>{title}</Heading>
      </CardHeader>
      <CardBody>
        {children}
        <Flex>
          <Spacer />
          <Button isDisabled={isInvalid} mt={4} onClick={onSubmit}>
            {submitButton}
          </Button>
        </Flex>
      </CardBody>
    </Card>
  );
};

// TODO: Error message
export const StringForm = ({
  title,
  value,
  setValue,
  isPassword = false,
  errorMessage = "",
}: {
  title: string;
  value: string;
  setValue: (s: string) => void;
  isPassword?: boolean;
  errorMessage?: string;
}) => {
  return (
    <>
      <FormLabel my={2}>{title}</FormLabel>
      <Tooltip label={errorMessage} placement="top">
        <Input
          type={isPassword ? "password" : "text"}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          isInvalid={errorMessage !== ""}
        />
      </Tooltip>
    </>
  );
};

export const TextForm = ({
  title = "",
  value,
  setValue,
  placeholder = "",
}: {
  title?: string;
  value: string;
  setValue: (s: string) => void;
  placeholder?: string;
}) => {
  return (
    <>
      <FormLabel my={2}>{title}</FormLabel>
      <Textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
      />
    </>
  );
};

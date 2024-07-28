"use client";

import { useAuth } from "../context/AuthContext";
import { LinkButton } from "./custom";
import {
  Button,
  Container,
  Divider,
  Flex,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import Link from "next/link";

const AccountMenuButton = () => {
  const { logout } = useAuth();
  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
        Account
      </MenuButton>
      <MenuList>
        <MenuItem onClick={logout}>Logout</MenuItem>
      </MenuList>
    </Menu>
  );
};

const Header = () => {
  const { user } = useAuth();
  return (
    <header
      style={{
        position: "fixed",
        top: "0pt",
        left: "0pt",
        width: "100%",
        backgroundColor: "white",
        zIndex: 2,
      }}
    >
      <Container maxW="container.lg">
        <Flex>
          <Link href="/">
            <Heading as="h2">Gomamayo Share</Heading>
          </Link>
          <Spacer />
          <Flex gap={2}>
            <LinkButton href={`/posts`}>Posts</LinkButton>
            <LinkButton href={`/posts/ranking`}>Ranking</LinkButton>
            {user ? (
              <AccountMenuButton />
            ) : (
              <LinkButton href={`/login`}>Login!</LinkButton>
            )}
          </Flex>
        </Flex>
      </Container>
      <Divider />
    </header>
  );
};

export default Header;

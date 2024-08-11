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
import { Link } from "@chakra-ui/next-js";

const AccountMenuButton = () => {
  const { user, logout } = useAuth();
  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
        Account
      </MenuButton>
      <MenuList>
        {user ? (
          <MenuItem onClick={logout}>Logout</MenuItem>
        ) : (
          <>
            <MenuItem as="a" href="/signup">
              アカウント登録
            </MenuItem>
            <MenuItem as="a" href="/login">
              ログイン
            </MenuItem>
          </>
        )}
      </MenuList>
    </Menu>
  );
};

const Header = () => {
  return (
    <header
      style={{
        position: "sticky",
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
            <AccountMenuButton />
          </Flex>
        </Flex>
      </Container>
      <Divider />
    </header>
  );
};

export default Header;

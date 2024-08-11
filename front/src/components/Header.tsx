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
  MenuDivider,
  MenuItem,
  MenuList,
  Spacer,
  useBreakpointValue,
} from "@chakra-ui/react";
import { ChevronDownIcon, HamburgerIcon } from "@chakra-ui/icons";
import { Link } from "@chakra-ui/next-js";

const AccountMenuItems = () => {
  const { user, logout } = useAuth();
  return user ? (
    <MenuItem onClick={logout}>ログアウト</MenuItem>
  ) : (
    <>
      <MenuItem as="a" href="/signup">
        アカウント登録
      </MenuItem>
      <MenuItem as="a" href="/login">
        ログイン
      </MenuItem>
    </>
  );
};

const MenuButtons = () => {
  const isDesktop = useBreakpointValue({ base: false, md: true });

  return (
    <Flex gap={2}>
      {isDesktop ? (
        <>
          <LinkButton href={`/posts`}>タイムライン</LinkButton>
          <LinkButton href={`/posts/ranking`}>ランキング</LinkButton>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              アカウント
            </MenuButton>
            <MenuList>
              <AccountMenuItems />
            </MenuList>
          </Menu>
        </>
      ) : (
        <Menu>
          <MenuButton as={Button}>
            <HamburgerIcon />
          </MenuButton>
          <MenuList>
            <MenuItem as="a" href="/posts">
              タイムライン
            </MenuItem>
            <MenuItem as="a" href="/posts/ranking">
              ランキング
            </MenuItem>
            <MenuDivider />
            <AccountMenuItems />
          </MenuList>
        </Menu>
      )}
    </Flex>
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
      <Container maxW="container.lg" p={2}>
        <Flex>
          <Link href="/">
            <Heading as="h2">Gomamayo Share</Heading>
          </Link>
          <Spacer />
          <MenuButtons />
        </Flex>
      </Container>
      <Divider />
    </header>
  );
};

export default Header;

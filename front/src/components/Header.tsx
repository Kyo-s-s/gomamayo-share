"use client";

import { useAuth } from "../context/AuthContext";
import { LinkButton } from "./custom";
import {
  Button,
  Container,
  Divider,
  Flex,
  Heading,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Spacer,
  useBreakpointValue,
} from "@chakra-ui/react";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  HamburgerIcon,
} from "@chakra-ui/icons";
import { Link } from "@chakra-ui/next-js";
import { useRouter } from "next/navigation";

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

const WideMenuButtons = () => {
  return (
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
  );
};

const HamburgerMenuButton = () => {
  return (
    <Menu>
      <MenuButton as={IconButton} icon={<HamburgerIcon />} variant="ghost" />
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
  );
};

const MenuButtons = () => {
  const isDesktop = useBreakpointValue({ base: false, md: true });

  return (
    <Flex gap={2}>
      {isDesktop ? <WideMenuButtons /> : <HamburgerMenuButton />}
    </Flex>
  );
};

const CreateHeader = ({ children }: { children: React.ReactNode }) => {
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
        <Flex>{children}</Flex>
      </Container>
      <Divider />
    </header>
  );
};

const Header = () => {
  return (
    <CreateHeader>
      <Link href="/">
        <Heading as="h2">Gomamayo Share</Heading>
      </Link>
      <Spacer />
      <MenuButtons />
    </CreateHeader>
  );
};

export default Header;

const BackButton = () => {
  const router = useRouter();
  return (
    <IconButton
      icon={<ChevronLeftIcon boxSize={8} />}
      onClick={router.back}
      aria-label="back"
      variant="ghost"
    />
  );
};

export const BackHeader = ({ title }: { title: string }) => {
  return (
    <CreateHeader>
      <BackButton />
      <Spacer />
      <Heading as="h2">{title}</Heading>
      <Spacer />
      <HamburgerMenuButton />
    </CreateHeader>
  );
};

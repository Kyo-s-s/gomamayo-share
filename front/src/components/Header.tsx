"use client";

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
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  HamburgerIcon,
} from "@chakra-ui/icons";
import { Link } from "@chakra-ui/next-js";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import { StringForm } from "./form";
import { changeNameAction } from "@/actions/user";
import useMessage from "@/utils/useMessage";
import { validateName } from "@/utils/validateName";

const LogoutMenuItem = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <MenuItem onClick={onOpen}>ログアウト</MenuItem>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent mx={2}>
          <ModalHeader>ログアウト確認</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            ログアウトしますか？
          </ModalBody>
          <ModalFooter gap={2}>
            <Button onClick={() => signOut()} colorScheme="red">
              ログアウト
            </Button>
            <Button onClick={onClose}>キャンセル</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

const NameChangeMenuItem = ({ beforeName }: { beforeName: string }) => {
  const [name, setName] = useState(beforeName);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { successMessage, errorMessage } = useMessage();
  const nameErr = validateName(name);

  return (
    <>
      <MenuItem onClick={onOpen}>ユーザー名変更</MenuItem>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent mx={2}>
          <ModalHeader>ユーザー名変更</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <StringForm title="ユーザー名" placeholder={beforeName} value={name} setValue={setName} errorMessage={nameErr} />
          </ModalBody>
          <ModalFooter gap={2}>
            <Button onClick={async () => {
              const res = await changeNameAction(name);
              if (res.ok) {
                successMessage({
                  description: "ユーザー名を変更しました。",
                });
                window.location.reload();
              } else {
                errorMessage({
                  description: `${res.error}`,
                });
              }
            }} colorScheme="red" disabled={nameErr !== ""}>
              変更
            </Button>
            <Button onClick={onClose}>キャンセル</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}


const AccountMenuItems = () => {
  const { data: session } = useSession();
  const user = session?.user;
  return user ? (
    <>
      <NameChangeMenuItem beforeName={user.name || ""} />
      <LogoutMenuItem />
    </>
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

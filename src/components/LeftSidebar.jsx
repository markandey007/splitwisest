import { Flex, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { IconList } from "@tabler/icons";
import Link from "next/link";
import { useRouter } from "next/router";

const NavLink = ({ link, label, currentRoute, children }) => {
  return (
    <Link href={link} passHref>
      <HStack
        cursor="pointer"
        borderLeft={currentRoute === link ? "4px solid #5BC5A7" : "none"}
        px="2"
      >
        {children}
        <Text color={currentRoute === link ? "#43BF9C" : "black"}>{label}</Text>
      </HStack>
    </Link>
  );
};

const LeftSidebar = () => {
  const router = useRouter();
  const currentRoute = router.pathname;

  return (
    <>
      <Flex
        width="20%"
        h="90vh"
        py="8"
        px="4"
        bgColor="#f5f3f2"
        direction="column"
        alignItems="flex-start"
        gap="2"
        overflowY="-moz-hidden-unscrollable"
      >
        <NavLink link="/" label="Dashboard" currentRoute={currentRoute}>
          <Image src="/logo.png" as="img" h={4} alt="logo" />
        </NavLink>
        <NavLink
          link="/expenses"
          label="All expenses"
          currentRoute={currentRoute}
        >
          <IconList size={20} />
        </NavLink>
      </Flex>
    </>
  );
};

export default LeftSidebar;

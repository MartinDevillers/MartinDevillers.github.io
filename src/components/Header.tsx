import {
  Box,
  Flex,
  Container,
  Stack,
  IconButton,
  useColorModeValue,
  useColorMode,
  Heading,
  Link,
} from "@chakra-ui/react"
import { IoMoon, IoSunny } from "react-icons/io5"
import NextLink from "next/link"
import TextUnderline from "./TextUnderline"

export interface NavItemProps {
  label: string
  href: string
}

export const navItems: Array<NavItemProps> = [
  {
    label: "Work",
    href: "/work",
  },
  {
    label: "Blog",
    href: "/blog",
  },
  {
    label: "About",
    href: "/about",
  },
]

const NavItem: React.FC<NavItemProps> = ({ label, href }) => (
  <NextLink key={label} href={href ?? "#"} passHref>
    <Link
      href="dummy"
      fontSize="md"
      color={useColorModeValue("gray.600", "gray.200")}
      _hover={{
        textDecoration: "none",
        color: useColorModeValue("gray.800", "white"),
      }}
    >
      {label}
    </Link>
  </NextLink>
)

const Header: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Box>
      <Flex
        as="header"
        pos="fixed"
        top="0"
        w="full"
        minH="60px"
        boxShadow="sm"
        zIndex="999"
        justify="center"
        css={{
          backdropFilter: "saturate(180%) blur(5px)",
          backgroundColor: useColorModeValue("rgba(255, 255, 255, 0.8)", "rgba(26, 32, 44, 0.8)"),
        }}
      >
        <Container as={Flex} maxW="7xl" align="center">
          <Flex flex={{ base: 1, md: "auto" }} justify={{ base: "start", md: "start" }}>
            <NextLink href="/" passHref>
              <Stack as="a" direction="row" alignItems="center" spacing={{ base: 2, sm: 4 }}>
                {/* <Icon as={Logo} w={{ base: 8 }} h={{ base: 8 }} /> */}
                <Heading as="h1" fontSize="xl">
                  <Box as="span" display={{ base: "none", sm: "revert" }}>
                    Martin{" "}
                  </Box>
                  <TextUnderline>Devillers</TextUnderline>
                </Heading>
              </Stack>
            </NextLink>
          </Flex>

          <Stack
            direction="row"
            align="center"
            spacing={{ base: 6, md: 8 }}
            flex={{ base: 1, md: "auto" }}
            justify="flex-end"
          >
            <Stack direction="row" spacing={4}>
              {navItems.map((navItem) => (
                <NavItem {...navItem} />
              ))}
            </Stack>
            <IconButton
              size="sm"
              variant="ghost"
              aria-label="Toggle Color Mode"
              onClick={toggleColorMode}
              icon={colorMode === "light" ? <IoMoon size={18} /> : <IoSunny size={18} />}
            />
          </Stack>
        </Container>
      </Flex>
    </Box>
  )
}

export default Header

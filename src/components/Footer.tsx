import { ReactNode } from "react"
import { Box, chakra, Container, Stack, Text, useColorModeValue, VisuallyHidden } from "@chakra-ui/react"
import { FaStackOverflow, FaGithub, FaLinkedinIn } from "react-icons/fa"

const SocialButton: React.FC<{ children: ReactNode; label: string; href: string }> = ({ children, label, href }) => {
  return (
    <chakra.button
      bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
      rounded="full"
      w={8}
      h={8}
      cursor="pointer"
      as="a"
      href={href}
      target="_blank"
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      transition="background 0.3s ease"
      _hover={{
        bg: useColorModeValue("brand.100", "brand.600"),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  )
}

const Footer: React.FC = () => (
  <Box bg={useColorModeValue("gray.50", "gray.900")} color={useColorModeValue("gray.700", "gray.200")}>
    <Container
      as={Stack}
      maxW="7xl"
      py={4}
      direction={{ base: "column", md: "row" }}
      spacing={4}
      justify={{ base: "center", md: "space-between" }}
      align={{ base: "center", md: "center" }}
    >
      <Text>© 2022 Martin Devillers. All rights reserved</Text>
      <Stack direction="row" spacing={6}>
        <SocialButton label="GitHub" href="https://github.com/MartinDevillers">
          <FaGithub />
        </SocialButton>
        <SocialButton label="StackOverflow" href="https://stackoverflow.com/users/546967/martin-devillers">
          <FaStackOverflow />
        </SocialButton>
        <SocialButton label="LinkedIn" href="https://www.linkedin.com/in/devillers">
          <FaLinkedinIn />
        </SocialButton>
      </Stack>
    </Container>
  </Box>
)

export default Footer

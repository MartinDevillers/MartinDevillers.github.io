import Image from "next/image"
import NextLink from "next/link"
import { Avatar, Badge, Box, Flex, Heading, Spacer, Stack, Text, useColorModeValue } from "@chakra-ui/react"
import { Project } from "types"

const ProjectCard: React.FC<Project> = ({ slug, name, role, client, date, description, thumb, icon, active }) => (
  <NextLink href={`/work/${slug}`} passHref>
    <Box
      maxW="445px"
      w="full"
      borderBottomWidth="5px"
      borderBottomColor={useColorModeValue("gray.100", "gray.800")}
      bg={useColorModeValue("white", "gray.900")}
      boxShadow="2xl"
      rounded="md"
      p={6}
      overflow="hidden"
      cursor="pointer"
      transition="transform 200ms ease-in-out"
      _hover={{
        transform: "translateY(-3px)",
        borderBottomColor: "brand.500",
        bg: useColorModeValue("gray.50", "gray.800"),
        boxShadow: "3xl",
      }}
    >
      <Box h="210px" bg="gray.100" mt={-6} mx={-6} mb={6} pos="relative">
        <Image src={thumb} layout="fill" objectFit="cover" />
      </Box>
      <Stack h="calc(100% - 210px)">
        <Flex>
          <Text color="brand.500" textTransform="uppercase" fontWeight={800} fontSize="sm" letterSpacing={1.1}>
            {role}
          </Text>
          <Spacer />
          {active && (
            <Badge fontSize="sm" colorScheme="brand" variant="subtle">
              Current
            </Badge>
          )}
        </Flex>
        <Heading color={useColorModeValue("gray.700", "white")} fontSize="2xl" fontFamily="body">
          {name}
        </Heading>
        <Text color="gray.500">{description}</Text>
        <Spacer />
        <Stack mt={6} direction="row" spacing={4} align="center">
          <Avatar src={icon} name={client} bgColor="white" />
          <Stack direction="column" spacing={0} fontSize="sm">
            <Text fontWeight={600}>{client}</Text>
            <Text color="gray.500">{date}</Text>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  </NextLink>
)

export default ProjectCard

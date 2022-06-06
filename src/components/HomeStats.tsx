import {
  Box,
  Heading,
  Flex,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
  Container,
} from "@chakra-ui/react"
import { ReactNode } from "react"
import { FaStackOverflow, FaGitAlt } from "react-icons/fa"
import { BiPackage } from "react-icons/bi"

interface StatsCardProps {
  title: string
  unit: string
  stat: string
  icon: ReactNode
  href: string
}

// https://api.stackexchange.com/2.3/users/546967?order=desc&sort=reputation&site=stackoverflow

const StatsCard: React.FC<StatsCardProps> = ({ title, unit, stat, icon, href }) => (
  <a href={href} target="_blank" rel="noreferrer">
    <Stat
      px={{ base: 2, md: 4 }}
      py="5"
      shadow="xl"
      border="1px solid"
      borderColor={useColorModeValue("gray.800", "gray.500")}
      rounded="lg"
      bg={useColorModeValue("whiteAlpha.600", "blackAlpha.600")}
      size="lg"
      cursor="pointer"
      transition="transform 200ms ease-in-out"
      _hover={{
        transform: "translateY(-3px)",
        bg: useColorModeValue("whiteAlpha.700", "blackAlpha.700"),
        boxShadow: "2xl",
      }}
    >
      <Flex justifyContent="space-around">
        <Box pl={{ base: 2, md: 4 }} textAlign="center">
          <StatLabel fontSize="lg" fontWeight="medium" isTruncated>
            {title}
          </StatLabel>
          <StatNumber fontSize="2xl" fontWeight="medium">
            {stat}
          </StatNumber>
          <StatLabel fontSize="lg" fontWeight="light" isTruncated>
            {unit}
          </StatLabel>
        </Box>
        <Box my="auto" color={useColorModeValue("gray.800", "gray.200")} alignContent="center">
          {icon}
        </Box>
      </Flex>
    </Stat>
  </a>
)

const HomeStats: React.FC = () => {
  return (
    <Box
      w="100%"
      minH="100vh"
      bgImage="/assets/home-backdrop.jpg"
      bgSize="cover"
      bgAttachment="fixed"
      bgPos="50% 20%"
      pos="relative"
      bgRepeat="no-repeat"
      _before={{
        content: '""',
        position: "absolute",
        top: "0px",
        right: "0px",
        bottom: "0px",
        left: "0px",
        backgroundColor: useColorModeValue("gray.200", "gray.800"),
        opacity: 0.5,
      }}
    >
      <Container maxW="3xl" centerContent justifyContent="center" h="100vh">
        <Heading py={10} zIndex={1} textAlign="center" fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}>
          Keep calm and write code! 🤓
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
          <StatsCard
            title="StackOverflow"
            unit="reputation"
            stat="15,889"
            icon={<FaStackOverflow size="3em" />}
            href="https://stackoverflow.com/users/546967/martin-devillers"
          />
          <StatsCard
            title="GitHub"
            unit="commits"
            stat="10,715"
            icon={<FaGitAlt size="3em" />}
            href="https://github.com/MartinDevillers"
          />
          <StatsCard
            title="Maven Central"
            unit="downloads"
            stat="3,710"
            icon={<BiPackage size="3em" />}
            href="https://mvnrepository.com/artifact/nl.devillers"
          />
        </SimpleGrid>
      </Container>
    </Box>
  )
}

export default HomeStats

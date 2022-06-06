import {
  Stat,
  useColorModeValue,
  Flex,
  Box,
  StatLabel,
  StatNumber,
  SimpleGrid,
  Avatar,
  Icon,
  Text,
} from "@chakra-ui/react"
import { GoCalendar, GoPerson } from "react-icons/go"
import { useBreakpointValue } from "@chakra-ui/media-query"

const fontSize = { base: "md", lg: "xl" }
const logoSize = { base: "md", lg: "md" }
const iconSize = { base: "2em", lg: "3em" }
const spacing = { base: 4, md: 5, lg: 6 }
const borderRadius = { base: "base", md: "md", lg: "lg" }
const boxShadow = { base: "base", md: "md", lg: "lg" }

interface StatsCardProps {
  title: string
  stat: string
  icon: JSX.Element
}

const StatsCard: React.FC<StatsCardProps> = ({ title, stat, icon }) => (
  <Stat
    px={{ base: 2, md: 4 }}
    py="5"
    shadow={boxShadow}
    border="1px solid"
    borderColor={useColorModeValue("gray.800", "gray.500")}
    rounded={borderRadius}
  >
    <Flex justifyContent="space-between">
      <Box pl={{ base: 2, md: 4 }}>
        <StatLabel fontWeight="medium" color={useColorModeValue("gray.800", "gray.500")} isTruncated>
          {title}
        </StatLabel>
        <StatNumber fontSize={fontSize} fontWeight="medium">
          {stat}
        </StatNumber>
      </Box>
      <Box my="auto" color={useColorModeValue("gray.800", "gray.200")} alignContent="center">
        {icon}
      </Box>
    </Flex>
  </Stat>
)

interface ProjectSummaryProps {
  client: string
  logo: string
  role: string
  date: string
  location: string
  country: string
}

const ProjectSummary: React.FC<ProjectSummaryProps> = ({ client, logo, role, date, location, country }) => (
  <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} spacing={{ base: 5, lg: 8 }} my={spacing}>
    <StatsCard
      title="Client"
      stat={client}
      icon={<Avatar src={logo} name={client} bgColor="white" size={useBreakpointValue(logoSize)} />}
    />
    <StatsCard title="Role" stat={role} icon={<Icon as={GoPerson} boxSize={iconSize} />} />
    <StatsCard title="Date" stat={date} icon={<Icon as={GoCalendar} boxSize={iconSize} />} />
    <StatsCard
      title="Location"
      stat={location}
      // icon={<Icon as={GoLocation} boxSize={iconSize} />}
      icon={<Text fontSize="4xl">{country}</Text>}
    />
  </SimpleGrid>
)

export default ProjectSummary

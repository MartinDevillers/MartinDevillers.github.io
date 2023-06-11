import { Stat, useColorModeValue, Flex, Box, StatLabel, StatNumber, SimpleGrid, Avatar, Text } from "@chakra-ui/react"
import { useBreakpointValue } from "@chakra-ui/media-query"
import { borderRadius, boxShadow, spacing } from "utils/theme"

const fontSize = { base: "md", lg: "xl" }
const logoSize = { base: "md", lg: "md" }

interface StatsCardProps {
  title: string
  stat: string
  icon: JSX.Element
}

const StatsCard: React.FC<StatsCardProps> = ({ title, stat, icon }) => (
  <Stat
    px={{ base: 4, md: 6 }}
    py={{ base: 3, md: 5 }}
    shadow={boxShadow}
    border="1px solid"
    borderColor={useColorModeValue("gray.800", "gray.500")}
    rounded={borderRadius}
  >
    <Flex justifyContent="space-between">
      <Box>
        <StatLabel fontWeight="medium" color={useColorModeValue("gray.800", "gray.500")} isTruncated>
          {title}
        </StatLabel>
        <StatNumber fontSize={fontSize} fontWeight="medium">
          {stat}
        </StatNumber>
      </Box>
      <Box
        w={12}
        my="auto"
        color={useColorModeValue("gray.800", "gray.200")}
        alignContent="center"
        textAlign={{ base: "center", md: "right" }}
      >
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
    <StatsCard title="Role" stat={role} icon={<Text fontSize="4xl">👨‍💻</Text>} />
    <StatsCard title="Date" stat={date} icon={<Text fontSize="4xl">📅</Text>} />
    <StatsCard title="Location" stat={location} icon={<Text fontSize="4xl">{country}</Text>} />
  </SimpleGrid>
)

export default ProjectSummary

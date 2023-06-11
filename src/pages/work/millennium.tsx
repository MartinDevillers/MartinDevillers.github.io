/* eslint-disable jsx-a11y/media-has-caption */
import {
  AspectRatio,
  Box,
  Heading,
  SimpleGrid,
  Stat,
  StatArrow,
  StatHelpText,
  StatLabel,
  StatNumber,
  useColorModeValue,
} from "@chakra-ui/react"
import Carousel from "components/Carousel"
import Layout from "components/Layout"
import { MdxHeading1, MdxHeading2, MdxText } from "components/MdxComponents"
import PageContainer from "components/PageContainer"
import ProjectSummary from "components/ProjectSummary"
import { NextPage } from "next"
import { borderRadius, fontSizeHeading, spacing, spacingDouble } from "utils/theme"

const images = [
  { src: "/assets/projects/millennium/millennium-01.jpg", title: "Electric distribution" },
  { src: "/assets/projects/millennium/millennium-02.jpg", title: "PG&E century old general office building and annex" },
  { src: "/assets/projects/millennium/millennium-03.jpg", title: "Maintenance crew working on power lines" },
]

interface StatsCardProps {
  label: string
  number: string
  text: string
  arrow: "none" | "increase" | "decrease"
}

const StatsCard: React.FC<StatsCardProps> = ({ label, number, text, arrow }) => (
  <Box
    px={{ base: 4, md: 6 }}
    py="5"
    border="1px solid"
    borderColor={useColorModeValue("gray.800", "gray.500")}
    rounded={borderRadius}
  >
    <Stat>
      <StatLabel>{label}</StatLabel>
      <StatNumber fontSize={{ base: "xl", lg: "2xl" }}>{number}</StatNumber>
      <StatHelpText>
        {arrow !== "none" && <StatArrow type={arrow} />}
        {text}
      </StatHelpText>
    </Stat>
  </Box>
)

const MillenniumPage: NextPage = () => (
  <Layout title="Pacific Gas and Electric Company">
    <PageContainer>
      <Heading as="h1" fontSize={fontSizeHeading} my={spacingDouble}>
        Fixed Income, Commodities and Risk Technology
      </Heading>
      <Carousel images={images} />
      <ProjectSummary
        client="Millennium"
        logo="/assets/projects/millennium/millennium-vendor-logo.svg"
        date="2023 - current"
        location="Miami, FL"
        country="🇺🇸"
        role="Software Engineer"
      />
      <MdxText>
        Millennium is a global alternative investment management firm, founded in 1989 by Israel Englander, which
        manages more than $58 billion in assets. We seek to pursue a diverse array of investment strategies across
        industry sectors, asset classes, and geographies. Our employees are empowered to deliver exceptional outcomes
        and enable our portfolio managers to do what they do best – navigate the markets.
      </MdxText>
      <SimpleGrid columns={[null, 1, 3]} spacing={{ base: 5, lg: 8 }}>
        <StatsCard label="AUM" number="$58.9bn+" text="7.29%" arrow="increase" />
        <StatsCard label="Track Record" number="30+ years" text="" arrow="none" />
        <StatsCard label="Employees" number="5,000+" text="25.64%" arrow="increase" />
      </SimpleGrid>
      <MdxHeading1>Investment Strategies</MdxHeading1>
      <MdxText>Millennium’s four primary strategies are:</MdxText>
      <SimpleGrid columns={[null, 1, 2]} spacing={{ base: 5, lg: 8 }}>
        <Box>
          <MdxHeading2 mt={spacing}>RV Fundamental Equity</MdxHeading2>
          <MdxText>
            Our teams perform fundamental research on companies both as generalists and as specialists within a
            particular sector or sub-sector.
          </MdxText>
        </Box>
        <Box>
          <MdxHeading2 mt={spacing}>Equity Arbitrage</MdxHeading2>
          <MdxText>
            Our teams pursue a variety of systematic and fundamental arbitrage strategies across different parts of a
            firm’s capital structure and a variety of derivatives, such as merger arbitrage, event-driven strategies,
            convertible arbitrage, option-volatility trading, and others.
          </MdxText>
        </Box>
        <Box>
          <MdxHeading2 mt={spacing}>Fixed Income Strategies</MdxHeading2>
          <MdxText>
            Our teams manage a number of different strategies including rates, macro, credit, mortgages and asset-backed
            securities, and commodities.
          </MdxText>
        </Box>
        <Box>
          <MdxHeading2 mt={spacing}>Quantitative Strategies</MdxHeading2>
          <MdxText>
            Our teams build and enhance investment processes that are primarily quantitatively driven and focused on a
            variety of asset classes, including global equities, interest rates, foreign exchange instruments, and
            commodity-linked derivative instruments.
          </MdxText>
        </Box>
      </SimpleGrid>
      <AspectRatio ratio={16 / 9} mb={4}>
        <video controls controlsList="nodownload">
          <source src="https://player.vimeo.com/external/427786776.hd.mp4?s=35bce7089fcccf58c350c9289f273bf8c4760f8b&amp;profile_id=175" />
        </video>
      </AspectRatio>
      <MdxHeading1>Core Principles</MdxHeading1>
      <MdxText>
        At Millennium, our mission is clear – to deliver the alternative investment industry’s highest quality returns
        to our investors while maintaining a commitment to our principles of integrity, discipline, and excellence.
      </MdxText>
      <SimpleGrid columns={[null, 1, 3]} spacing={{ base: 5, lg: 8 }}>
        <Box>
          <MdxHeading2 mt={spacing}>Integrity</MdxHeading2>
          <MdxText>
            We operate with clarity of purpose, striving to maintain alignment with our investors and working with the
            expectation that our people will conduct themselves with professionalism and respect for our core values.
          </MdxText>
        </Box>
        <Box>
          <MdxHeading2 mt={spacing}>Discipline</MdxHeading2>
          <MdxText>
            Managing risk is at the core of what we do. We take a measured and thoughtful approach in both our
            investment and operational activities, pursuing new opportunities rigorously, pragmatically, and with an eye
            towards maintaining a standard of excellence.
          </MdxText>
        </Box>
        <Box>
          <MdxHeading2 mt={spacing}>Excellence</MdxHeading2>
          <MdxText>
            We believe in constantly improving how we operate, striving to develop leading talent, resources, and
            processes.
          </MdxText>
        </Box>
      </SimpleGrid>
      <AspectRatio ratio={16 / 9} mb={4}>
        <video controls controlsList="nodownload">
          <source src="https://player.vimeo.com/progressive_redirect/playback/801623371/rendition/1080p/file.mp4?loc=external&amp;signature=dc2086d223fb949216b08ab14f64f5eeb2257bd894e2defc0b2f03216ae2d44f" />
        </video>
      </AspectRatio>
    </PageContainer>
  </Layout>
)

export default MillenniumPage

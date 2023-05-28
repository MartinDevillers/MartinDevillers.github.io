import { AspectRatio, Heading } from "@chakra-ui/react"
import Carousel from "components/Carousel"
import Layout from "components/Layout"
import { MdxHeading1, MdxLink, MdxListItemTrophy, MdxText, MdxUnorderedList } from "components/MdxComponents"
import PageContainer from "components/PageContainer"
import ProjectSummary from "components/ProjectSummary"
import { NextPage } from "next"

const images = [
  { src: "/assets/projects/t-mobile/t-mobile-05.jpg", title: "Apple, a T-Mobile partner" },
  { src: "/assets/projects/t-mobile/t-mobile-01.jpg", title: "T-Mobile Logo" },
  { src: "/assets/projects/t-mobile/t-mobile-02.jpg", title: "5G for everyone" },
  { src: "/assets/projects/t-mobile/t-mobile-03.jpg", title: "Connecting the USA" },
  { src: "/assets/projects/t-mobile/t-mobile-04.jpg", title: "Cross company integration" },
]

const TpasPage: NextPage = () => (
  <Layout title="T-Mobile">
    <PageContainer>
      <Heading as="h1" fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }} my={{ base: 8, md: 10, lg: 12 }}>
        The Manhattan Initiative
      </Heading>
      <Carousel images={images} />
      <ProjectSummary
        client="T-Mobile US, Inc."
        logo="/assets/projects/t-mobile/t-mobile-vendor-logo.svg"
        date="2021 - 2022"
        location="Bellevue, WA"
        country="🇺🇸"
        role="Senior Software Engineer"
      />
      <MdxText>
        I am a Senior Software Engineer on the <MdxLink href="https://www.t-mobile.com">T-Mobile</MdxLink> Manhattan
        Core Team. Our mission is to empower smartphone manufactures with the capacity to directly provision cellphone
        service on the devices they produce. Essentially, any store-bought device should have full service from day one.
        Simply unbox, turn on and enjoy service. In order to fulfill our mission, we are reconsolidating
        T-Mobile&rsquo;s internal micro-services landscape into a single unified set of fifty high-quality
        self-describing fully distributed API&rsquo;s and integrating this cryptographic device entitlement layer
        directly into the systems of <MdxLink href="https://www.apple.com">Apple</MdxLink>,{" "}
        <MdxLink href="https://www.samsung.com">Samsung</MdxLink> and more.
      </MdxText>
      <MdxText>
        My day to day consists of experimenting with techical POC&rsquo;s, turning said POC&rsquo;s into working
        solutions, guiding developers across teams and providing eye-in-the-sky support for anything related to{" "}
        <MdxLink href="https://redis.io">Redis</MdxLink>.
      </MdxText>
      <MdxText>
        I am the Technical Champion of the Control Object Storage Engine, a proprietary implementation of the
        distributed live-object model, essentially using <MdxLink href="https://redis.io">Redis</MdxLink> as a shared
        heap for JVM&rsquo;s running in different datacenters across the US.
      </MdxText>
      <MdxHeading1>Personal Achievements</MdxHeading1>
      <MdxUnorderedList>
        <MdxListItemTrophy>
          Reduced OP/s and memory footprint on <MdxLink href="https://redis.io">Redis</MdxLink> by 95% by singlehandedly
          implementing a custom Java serialization mechanism using{" "}
          <MdxLink href="https://cbor.io">Concise Binary Object Representation (CBOR)</MdxLink>,{" "}
          <MdxLink href="https://github.com/google/snappy">Google Snappy</MdxLink> for compression and{" "}
          <MdxLink href="https://redis.io">Redis</MdxLink> Bucket-based Storage.
        </MdxListItemTrophy>
        <MdxListItemTrophy>
          Improved performance (max-RPS) of <MdxLink href="https://graphql.org">GraphQL</MdxLink> API&rsquo;s by a
          factor of 4 by multiplexing internal query resolvers. Inflight IO-sensitive operations are batched and
          subsequently dispatched using a custom mechanism I implemented, similar to the{" "}
          <MdxLink href="https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/">
            Node.js Event Loop model
          </MdxLink>
          , but then for JVM-based applications.
        </MdxListItemTrophy>
        <MdxListItemTrophy>
          Singlehandedly built TDOG, a tool engineers use to manage the micro-service ecosystem, including homogeneity
          of dependencies, release train consistency, and analyzing runtime telemetry for failure.
        </MdxListItemTrophy>
        <MdxListItemTrophy>
          Lead the bi-weekly architectural forum for discussing technical challenges and direction (8 teams; 75
          attendants)
        </MdxListItemTrophy>
      </MdxUnorderedList>
      <MdxText>
        I enjoy working on this project as I believe that internet access should be as frictionless as possible.{" "}
      </MdxText>
      <AspectRatio ratio={16 / 9} mb={4}>
        <iframe title="T-Mobile e-SIM" src="https://www.youtube.com/embed/MHlyCxLxFjg" allowFullScreen />
      </AspectRatio>
    </PageContainer>
  </Layout>
)

export default TpasPage

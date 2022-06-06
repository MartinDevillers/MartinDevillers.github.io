import { AspectRatio, Heading } from "@chakra-ui/react"
import Carousel from "components/Carousel"
import Layout from "components/Layout"
import { MdxLink, MdxListItem, MdxText, MdxUnorderedList } from "components/MdxComponents"
import PageContainer from "components/PageContainer"
import ProjectSummary from "components/ProjectSummary"
import { NextPage } from "next"

const images = [
  { src: "/assets/projects/dedicon/dedicon-01.jpeg", title: "Project war room" },
  { src: "/assets/projects/dedicon/dedicon-02.jpg", title: "Project war room" },
  { src: "/assets/projects/dedicon/dedicon-03.jpeg", title: "Project war room" },
  { src: "/assets/projects/dedicon/dedicon-04.jpeg", title: "Project war room" },
  // { src: "/assets/projects/dedicon/dedicon-10.jpg", title: "Project war room" },
  // { src: "/assets/projects/dedicon/dedicon-09.jpg", title: "Dedicon architecture" },
  // { src: "/assets/projects/dedicon/dedicon-11.png", title: "Canonical Data Model" },
  // { src: "/assets/projects/dedicon/dedicon-12.png", title: "AFAS Profit - Order Configuration" },
  // { src: "/assets/projects/dedicon/dedicon-13.png", title: "AFAS Profit - Workflow" },
  // { src: "/assets/projects/dedicon/dedicon-22.jpg", title: "Zabbix Custom Metrics" }
]

const WingPage: NextPage = () => (
  <Layout title="Dedicon">
    <PageContainer>
      <Heading as="h1" fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }} my={{ base: 8, md: 10, lg: 12 }}>
        Braille &amp; Audio Production
      </Heading>
      <Carousel images={images} />
      <ProjectSummary
        client="Stichting Dedicon"
        logo="/assets/projects/wing/wing-vendor-logo.png"
        date="2016 - 2017"
        location="Grave"
        country="🇳🇱"
        role="Lead Software Engineer"
      />
      <MdxText>
        <MdxLink href="https://www.dedicon.nl">Dedicon</MdxLink> is a non-for-profit that serves the visually impaired
        population of the Netherlands by making information readable, visible, audible or tangible. I really enjoyed
        working for Dedicon and contributing to their cause of helping our fellow impaired citizens.
      </MdxText>
      <MdxText>
        As a lead dev, I was responsible for the technical design and implementation of the new production and
        reproduction orchestration, which processes over a million orders each year. My primary focus lay on the Broker;
        a sophisticated integration between the Cloud-based ERP-solution AFAS Profit and Dedicon&rsquo;s own internal
        service landscape.
      </MdxText>
      <MdxUnorderedList>
        <MdxListItem>
          Put Profit, <MdxLink href="https://www.afas.nl/software/erp">the ERP-solution of AFAS</MdxLink>, at the heart
          of the system, centralizing data there and minimizing alternate truths
        </MdxListItem>
        <MdxListItem>Capable of processing thousands of orders in a short period (burst-processing)</MdxListItem>
        <MdxListItem>
          Transaction-based, parallelized and idempotent processing of orders, maximizing throughput, minimizing
          fall-out, supporting recovery and disaster scenarios
        </MdxListItem>
        <MdxListItem>
          Design and implement a{" "}
          <MdxLink href="https://en.wikipedia.org/wiki/Canonical_model">Canonical Data Model</MdxLink> to ease reasoning
          by domain experts and standardize messaging exchange between applications
        </MdxListItem>
        <MdxListItem>
          Generate metrics and push telemetry to Dedicon&rsquo;s operations monitoring system (
          <MdxLink href="https://www.zabbix.com/">Zabbix</MdxLink>)
        </MdxListItem>
        <MdxListItem>Simple web-interface for operations to handle orders that failed to process</MdxListItem>
        <MdxListItem>
          Implementation using well-known industry proven technologies, like Java,{" "}
          <MdxLink href="https://spring.io/projects/spring-boot">Spring Boot</MdxLink>,{" "}
          <MdxLink href="https://www.microsoft.com/en-us/sql-server/">SQL Server</MdxLink>,{" "}
          <MdxLink href="https://www.altova.com/xml-schema-tools">XML/XSD</MdxLink>, etc.
        </MdxListItem>
        <MdxListItem>Set-up DTAP-environment, automated builds and deployments</MdxListItem>
      </MdxUnorderedList>
      <MdxText>
        I incorporated all the above requirements into a suitable implementation based on modern techniques and design
        principles.
      </MdxText>
      <MdxText>
        As a tech lead, I provided guidance to the software development team of Dedicon (8 people), by introducing the{" "}
        <MdxLink href="https://www.atlassian.com/">Atlassian stack</MdxLink>,{" "}
        <MdxLink href="https://jenkins.io/">automating builds</MdxLink>, automating regression testing, introducing{" "}
        <MdxLink href="https://www.thoughtworks.com/continuous-integration">continuous integration</MdxLink> and
        automating deployments.
      </MdxText>
      <MdxText>
        <MdxLink href="https://www.afas.nl/klantverhaal/dedicon">
          Click here to read more about this success story (Dutch)
        </MdxLink>
      </MdxText>
      <AspectRatio ratio={16 / 9} mb={4}>
        <iframe title="Dedicon" src="https://www.youtube.com/embed/vpUJtF0aniw" allowFullScreen />
      </AspectRatio>
    </PageContainer>
  </Layout>
)

export default WingPage

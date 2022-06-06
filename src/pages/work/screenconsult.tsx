import { Heading, AspectRatio } from "@chakra-ui/react"
import Carousel from "components/Carousel"
import Layout from "components/Layout"
import { MdxHeading1, MdxLink, MdxText } from "components/MdxComponents"
import PageContainer from "components/PageContainer"
import ProjectSummary from "components/ProjectSummary"
import { NextPage } from "next"

const images = [
  { src: "/assets/projects/screenconsult/screenconsult-03.jpg", title: "ScreenConsult" },
  { src: "/assets/projects/screenconsult/screenconsult-04.jpg", title: "Technology behind ScreenConsult" },
  { src: "/assets/projects/screenconsult/screenconsult-05.jpg", title: "Online consultation" },
]

const ScreenConsultPage: NextPage = () => (
  <Layout title="ScreenConsult">
    <PageContainer>
      <Heading as="h1" fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }} my={{ base: 8, md: 10, lg: 12 }}>
        ScreenConsult E-Consult Solution
      </Heading>
      <Carousel images={images} />
      <ProjectSummary
        client="HagaZiekenhuis"
        logo="/assets/projects/screenconsult/screenconsult-vendor-logo.svg"
        date="2014"
        location="Den Haag"
        country="🇳🇱"
        role="Lead Software Engineer"
      />
      <MdxHeading1>What is ScreenConsult?</MdxHeading1>
      <MdxText>
        ScreenConsult is a simple video-conferencing solution for patients and specialists. Thanks to ScreenConsult,
        hospitals and treatment centers can easily extend their services with the modern remote-consultation concept.
        ScreenConsult is completely cloud-based and requires no separate software: a browser and a webcam are sufficient
        to use ScreenConsult. In addition, ScreenConsult works on all modern platforms, including smartphones and
        tablets.
      </MdxText>
      <AspectRatio ratio={16 / 9} mb={4}>
        <iframe title="LifeApps bij HagaZiekenhuis" src="https://www.youtube.com/embed/CoP9T5QHSYA" allowFullScreen />
      </AspectRatio>
      <MdxText>
        <MdxLink href="https://www.bikkelhart.com/cases/lifeapps/">
          Click here to read more about this innovative product
        </MdxLink>
      </MdxText>
      <MdxHeading1>My role as a lead software engineer</MdxHeading1>
      <MdxText>
        As the lead software engineer I am responsible for the technical design and implementation of ScreenConsult from
        day one. In addition to the usual activities required to implement a web-based cloud-native solution, I have
        also achieved an in-depth integration with Skype for Business (then Microsoft Lync). The quality of this
        integration is one of the critical success factors of ScreenConsult.
      </MdxText>
      <MdxHeading1>My role as a product developer</MdxHeading1>
      <MdxText>
        As a product developer, I help the product owner with the further development of the ScreenConsult concept.
        Because ScreenConsult uses state-of-the-art video-conferencing techniques, it is important to involve technology
        in the product design process. As a product developer, I am constantly balancing between what the customer
        wants, what fits within the budget and what is technically feasible. The goal is to use the power of technology
        as much as possible with as little effort as possible. Due to this strategy, we have succeeded in launching
        ScreenConsult as a powerful yet affordable proposition in the market.
      </MdxText>
    </PageContainer>
  </Layout>
)

export default ScreenConsultPage

import { AspectRatio, Heading } from "@chakra-ui/react"
import Carousel from "components/Carousel"
import Layout from "components/Layout"
import { MdxLink, MdxListItem, MdxText, MdxUnorderedList } from "components/MdxComponents"
import PageContainer from "components/PageContainer"
import ProjectSummary from "components/ProjectSummary"
import { NextPage } from "next"
import { fontSizeHeading, spacingDouble } from "utils/theme"

const images = [
  { src: "/assets/projects/ov-chipkaart/ov-chipkaart-03.jpg", title: "OV chip card gates" },
  { src: "/assets/projects/ov-chipkaart/ov-chipkaart-04.jpg", title: "Utrecht Central Station" },
  { src: "/assets/projects/ov-chipkaart/ov-chipkaart-01.jpg", title: "Renewed ov-chipkaart website" },
  { src: "/assets/projects/ov-chipkaart/ov-chipkaart-02.jpg", title: "Successful go live" },
]

const OvChipkaartPage: NextPage = () => (
  <Layout title="OV-chipkaart">
    <PageContainer>
      <Heading as="h1" fontSize={fontSizeHeading} my={spacingDouble}>
        ov-chipkaart.nl
      </Heading>
      <Carousel images={images} />
      <ProjectSummary
        client="Trans Link Systems"
        logo="/assets/projects/ov-chipkaart/ov-chipkaart-vendor-logo.png"
        date="2015"
        location="Amersfoort"
        country="🇳🇱"
        role="Lead Software Engineer"
      />
      <MdxText>
        As the lead software engineer of this project I am responsible for the architecture and technical implementation
        of the new front-office of the public transport chip card. In other words,{" "}
        <MdxLink href="https://www.ov-chipkaart.nl/">www.ov-chipkaart.nl</MdxLink>, the website and mobile app of the OV
        chip card that millions of travelers use every day in my country.
      </MdxText>
      <MdxText>
        A challenging project with many different facets and interesting issues. Below is a selection of the
        requirements that the public transport chip card must meet:
      </MdxText>
      <MdxUnorderedList>
        <MdxListItem>Suitable for all ages, population groups, tourists and people with disabilities</MdxListItem>
        <MdxListItem>Scalable up to 2500 simultaneous users</MdxListItem>
        <MdxListItem>Meets the Personal Data Protection Act (WBP)</MdxListItem>
        <MdxListItem>Full control over all content by the editors</MdxListItem>
        <MdxListItem>Centralized identity management for connecting third-party services</MdxListItem>
        <MdxListItem>
          Integration with back-office, facial recognition, document generators and online payment systems
        </MdxListItem>
        <MdxListItem>Short time-to-market through weekly delivery by development</MdxListItem>
        <MdxListItem>A few minutes of downtime per week for releases and maintenance</MdxListItem>
      </MdxUnorderedList>
      <MdxText>
        I incorporated all the above requirements into a suitable architecture based on modern techniques and design
        principles.
      </MdxText>
      <MdxText>
        In addition, I continuously assisted three teams in the translation of the design into a working application. I
        placed special emphasis on the following two topics: Everyone understands what needs to be done and we all sail
        the same course. Through decisiveness, vision and uninterrupted attention we have achieved a top performance in
        record time!
      </MdxText>
      <MdxText>
        <MdxLink href="https://www.ov-chipkaart.nl/news-articles/improved-thanks-to-your-suggestions.htm">
          Click here to read more about the new front office
        </MdxLink>
      </MdxText>
      <AspectRatio ratio={16 / 9} mb={4}>
        <iframe title="Dedicon" src="https://www.youtube.com/embed/lUu7lHHEsig" allowFullScreen />
      </AspectRatio>
    </PageContainer>
  </Layout>
)

export default OvChipkaartPage

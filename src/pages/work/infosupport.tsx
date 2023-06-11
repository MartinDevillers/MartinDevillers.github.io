import { Heading } from "@chakra-ui/react"
import Carousel from "components/Carousel"
import Layout from "components/Layout"
import { MdxHeading1, MdxLink, MdxListItemTrophy, MdxText, MdxUnorderedList } from "components/MdxComponents"
import PageContainer from "components/PageContainer"
import ProjectSummary from "components/ProjectSummary"
import { NextPage } from "next"
import { fontSizeHeading, spacingDouble } from "utils/theme"

const images = [
  { src: "/assets/projects/infosupport/infosupport-splash.jpg", title: "Product team" },
  { src: "/assets/projects/infosupport/infosupport-02.jpg", title: "Product team" },
  { src: "/assets/projects/infosupport/infosupport-03.jpg", title: "Product team" },
  // { src: "/assets/projects/infosupport/infosupport-05.jpg", title: "Kanzi - een raamwerk voor het ontwikkelen van slimme vragenlijsten" },
  // { src: "/assets/projects/infosupport/infosupport-06.jpg", title: "Business-rule gedreven vragenlijsten" },
  // { src: "/assets/projects/infosupport/infosupport-07.jpg", title: "Click-once deployment voor korte time to market" },
]

const KanziPage: NextPage = () => (
  <Layout title="Kanzi">
    <PageContainer>
      <Heading as="h1" fontSize={fontSizeHeading} my={spacingDouble}>
        Kanzi AI-powered Survey Tool
      </Heading>
      <Carousel images={images} />
      <ProjectSummary
        client="Info Support BV"
        logo="/assets/projects/infosupport/infosupport-vendor-logo.png"
        date="2013"
        location="Veenendaal"
        country="🇳🇱"
        role="Full Stack Developer"
      />
      <MdxText>
        Kanzi started out as an unnamed component in an existing software solution we created for a different client. I
        recognized the potential of this solution to serve as an independent product, so I lead its productization from
        inception to implementation.
      </MdxText>
      <MdxHeading1>Personal Achievements</MdxHeading1>
      <MdxText>As the only full stack developer on the product team, I have singlehandedly:</MdxText>
      <MdxUnorderedList>
        <MdxListItemTrophy>
          Detached the component from the existing solution by extracting the various elements and turning those into
          independent micro-frontends and micro-services
        </MdxListItemTrophy>
        <MdxListItemTrophy>
          Evolved the component into an independent product by refactoring the codebase so it&rsquo;s easier to
          implement into other software solutions
        </MdxListItemTrophy>
        <MdxListItemTrophy>
          Increased the products reach by creating and launching a marketing website
        </MdxListItemTrophy>
        <MdxListItemTrophy>
          Matured the product by providing documentation, marketing material and a licensing model
        </MdxListItemTrophy>
        <MdxListItemTrophy>Supported the sales process with presentations and technical expertise</MdxListItemTrophy>
        <MdxListItemTrophy>
          Implemented the product onsite at various customers throughout the Netherlands
        </MdxListItemTrophy>
      </MdxUnorderedList>
      <MdxText>Essentially, I turned a piece of code into a profitable product.</MdxText>
      <MdxText>
        <MdxLink href="/assets/kanzi.pdf">Click here to read more about Kanzi (Dutch)</MdxLink>
      </MdxText>
    </PageContainer>
  </Layout>
)

export default KanziPage

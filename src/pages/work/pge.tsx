import { AspectRatio, Heading } from "@chakra-ui/react"
import Carousel from "components/Carousel"
import Layout from "components/Layout"
import { MdxHeading1, MdxLink, MdxListItemTrophy, MdxText, MdxUnorderedList } from "components/MdxComponents"
import PageContainer from "components/PageContainer"
import ProjectSummary from "components/ProjectSummary"
import { NextPage } from "next"

const images = [
  { src: "/assets/projects/pge/pge-01.jpg", title: "Electric distribution" },
  { src: "/assets/projects/pge/pge-02.jpg", title: "PG&E century old general office building and annex" },
  { src: "/assets/projects/pge/pge-03.jpg", title: "Maintenance crew working on power lines" },
]

const PgePage: NextPage = () => (
  <Layout title="Pacific Gas and Electric Company">
    <PageContainer>
      <Heading as="h1" fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }} my={{ base: 8, md: 10, lg: 12 }}>
        Sherlock Rebuild
      </Heading>
      <Carousel images={images} />
      <ProjectSummary
        client="Pacific Gas and Electric Company"
        logo="/assets/projects/pge/pge-vendor-logo.svg"
        date="2023"
        location="Oakland, CA"
        country="🇺🇸"
        role="Lead Full-Stack Software Engineer"
      />
      <MdxText>
        The Sherlock Suite allows PG&E&rsquo;s desktop inspectors to mark up potential equipment problems on
        high-resolution images, further training computer-vision models to automatically detect potential issues and
        adding metadata to enable searchability of these images across the enterprise. Over 2019 and 2020, PG&E
        collected more than 5 million high-resolution images (up to 100 megapixel) of their Electric Transmission assets
        through drones, helicopters, and other means of data capture as part of their Wildfire Safety Inspection Program
        (WSIP). These images are ingested by Sherlock and analyzed using machine (AI) and human vision to assess
        maintenance needs.
      </MdxText>
      <MdxText>
        I was the Lead Full-Stack Software Engineer on the Sherlock V2 Rebuild Project. Our mission was to rebuild the
        entire Sherlock Suite from the ground up, using the latest and greatest technologies, to allow for a more
        flexible and scalable architecture, while keeping the same user experience and functionality.
      </MdxText>
      <MdxHeading1>Personal Achievements</MdxHeading1>
      <MdxUnorderedList>
        <MdxListItemTrophy>
          Singlehandedly laid the foundation for Sherlock V2 using <MdxLink href="https://nx.dev">Nx</MdxLink>,{" "}
          <MdxLink href="https://nestjs.com">NestJS</MdxLink>,{" "}
          <MdxLink href="https://www.typescriptlang.org">TypeScript</MdxLink>,{" "}
          <MdxLink href="https://reactjs.org">React</MdxLink>,{" "}
          <MdxLink href="https://tailwindcss.com">TailwindCSS</MdxLink>,{" "}
          <MdxLink href="https://graphql.org">GraphQL</MdxLink>, <MdxLink href="https://www.prisma.io">Prisma</MdxLink>,{" "}
          <MdxLink href="https://www.terraform.io">Terraform</MdxLink> and{" "}
          <MdxLink href="https://aws.amazon.com">AWS</MdxLink> to setup a monorepo for both micro frontends and
          backends.
        </MdxListItemTrophy>
        <MdxListItemTrophy>
          Improved image download performance by 300% by making a series of optimizations in the network and cloud
          infrastructure.
        </MdxListItemTrophy>
        <MdxListItemTrophy>
          Improved application resiliency and data loss prevention by disconnecting frontend state from backend
          persistence, instead piping all mutations through a transient state management layer that periodically syncs
          with the backend.
        </MdxListItemTrophy>
        <MdxListItemTrophy>
          Implemented a series of micro-frontends with <MdxLink href="https://reactjs.org">React</MdxLink> and{" "}
          <MdxLink href="https://tailwindcss.com">TailwindCSS</MdxLink> for asset inspection, user management, audit
          logs and more.
        </MdxListItemTrophy>
        <MdxListItemTrophy>
          Implemented a series of self-describing micro-backends supported by a single Data Model with{" "}
          <MdxLink href="https://nestjs.com">NestJS</MdxLink>, <MdxLink href="https://www.prisma.io">Prisma</MdxLink>{" "}
          and <MdxLink href="https://swagger.io">Swagger</MdxLink>.
        </MdxListItemTrophy>
        <MdxListItemTrophy>
          Implemented a monorepo publication pipeline using <MdxLink href="https://nx.dev">Nx</MdxLink>,{" "}
          <MdxLink href="https://www.terraform.io">Terraform</MdxLink> and{" "}
          <MdxLink href="https://aws.amazon.com/codepipeline">AWS CodePipeline</MdxLink> to intelligently build and
          deploy the entire Sherlock Suite. The pipeline relies on{" "}
          <MdxLink href="https://nx.dev/more-concepts/incremental-builds">Nx&rsquo;s Incremental Builds</MdxLink> and{" "}
          <MdxLink href="https://webpack.js.org/concepts/module-federation/">Webpack Module Federation</MdxLink> to only
          build and deploy the micro-apps that have changed since the last deployment.
        </MdxListItemTrophy>
      </MdxUnorderedList>
      <AspectRatio ratio={16 / 9} mb={4}>
        <iframe
          title="Automating PG&E’s Electric System Inspections with Sherlock Suite: Sherlock + Waldo"
          src="https://player.vimeo.com/video/426100266?h=c4e52df307&title=0&byline=0&portrait=0"
          allowFullScreen
        />
      </AspectRatio>
    </PageContainer>
  </Layout>
)

export default PgePage

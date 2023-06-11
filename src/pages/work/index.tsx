import { Heading, SimpleGrid } from "@chakra-ui/react"
import Layout from "components/Layout"
import { MdxText } from "components/MdxComponents"
import PageContainer from "components/PageContainer"
import ProjectCard from "components/ProjectCard"
import { NextPage } from "next"
import { projects } from "utils/projects"
import { fontSizeHeading, spacingDouble } from "utils/theme"

const WorkIndexPage: NextPage = () => (
  <Layout title="Work">
    <PageContainer>
      <Heading as="h1" fontSize={fontSizeHeading} my={spacingDouble}>
        Work
      </Heading>
      <MdxText>In the past decade, I have passionately worked on the following projects:</MdxText>
      <SimpleGrid columns={[null, 1, 2, 3]} spacing={10}>
        {projects.map((project) => (
          <ProjectCard key={project.slug} {...project} />
        ))}
      </SimpleGrid>
    </PageContainer>
  </Layout>
)

export default WorkIndexPage

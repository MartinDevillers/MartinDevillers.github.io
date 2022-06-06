import { Container, Heading, SimpleGrid, Stack, Text } from "@chakra-ui/react"
import Layout from "components/Layout"
import HomeStats from "components/HomeStats"
import ProjectCard from "components/ProjectCard"
import { projects } from "utils/projects"
import { loadAllPosts } from "utils/posts"
import PostCard from "components/PostCard"
import HomeClients from "components/HomeClients"
import HomeTechs from "components/HomeTechs"
import { Post } from "types"

export const getStaticProps = async () => {
  return {
    props: {
      posts: loadAllPosts(),
    },
  }
}

const spacing = { base: 4, md: 5, lg: 6 }
const spacingDouble = { base: 8, md: 10, lg: 12 }

interface HomeProps {
  posts: Post[]
}

const Home: React.FC<HomeProps> = ({ posts }) => (
  <Layout>
    <Container>
      <Stack spacing={{ base: 8, md: 14 }} minH="100vh" justifyContent="center">
        <Heading fontSize={{ base: "4xl", md: "5xl", lg: "6xl" }}>Hi there! 👋</Heading>
        <Text fontSize={{ base: "lg", md: "xl", lg: "2xl" }}>
          My name is Martin Devillers and I’m a quirky Software Engineer from Amsterdam, The Netherlands. I live in
          Miami, Florida, where I work remotely for a variety of clients across the USA.
        </Text>
      </Stack>
    </Container>
    <HomeTechs />
    <HomeStats />
    <HomeClients />
    <Container maxW="7xl" minH="100vh">
      <Heading as="h1" fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }} mt={spacingDouble} mb={spacing}>
        I am working on:
      </Heading>
      <SimpleGrid columns={[null, 1, 2, 3]} spacing={10}>
        <ProjectCard {...projects[0]} />
      </SimpleGrid>
      <Heading as="h1" fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }} mt={spacingDouble} mb={spacing}>
        I am writing about:
      </Heading>
      <SimpleGrid columns={[null, 1, 2, 3]} spacing={10} mb={spacingDouble}>
        <PostCard {...posts[0]} />
        <PostCard {...posts[1]} />
        <PostCard {...posts[2]} />
      </SimpleGrid>
    </Container>
  </Layout>
)

export default Home

import { Heading, SimpleGrid, Text } from "@chakra-ui/react"
import Layout from "components/Layout"
import PageContainer from "components/PageContainer"
import PostCard from "components/PostCard"
import { Post } from "types"
import { loadAllPosts } from "utils/posts"

const fontSize = { base: "3xl", md: "4xl", lg: "5xl" }
const spacingDouble = { base: 8, md: 10, lg: 12 }

export const getStaticProps = async () => {
  return {
    props: {
      posts: loadAllPosts(),
    },
  }
}

interface BlogIndexPageProps {
  posts: Post[]
}

const BlogIndexPage: React.FC<BlogIndexPageProps> = ({ posts }) => (
  <Layout title="Blog">
    <PageContainer>
      <Heading as="h1" fontSize={fontSize} my={spacingDouble}>
        Blog
      </Heading>
      <Text fontSize={{ md: "lg", lg: "xl" }} lineHeight={{ md: "tall", lg: 1.75 }} mb={{ base: 4, md: 5, lg: 6 }}>
        Welcome to my engineering blog! On this page you will find various brief posts I&rsquo;ve written over the
        years. Most of these posts focus on specific engineering challenges I&rsquo;ve faced, but some posts also cover
        events like awards I&rsquo;ve won or conferences I&rsquo;ve attended. I also use this space to crosspost my
        content from other sites (mostly StackOverflow).
      </Text>
      <SimpleGrid columns={[null, 1, 2, 3]} spacing={10}>
        {posts.map((post) => (
          <PostCard key={post.slug} {...post} />
        ))}
      </SimpleGrid>
    </PageContainer>
  </Layout>
)

export default BlogIndexPage

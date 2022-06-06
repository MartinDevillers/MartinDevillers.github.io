import { Box, Container, Divider, Flex, Heading, Spacer, Stack, Tag, useBreakpointValue } from "@chakra-ui/react"
import { format, parseISO } from "date-fns"
import Head from "next/head"
import { FrontMatter } from "types"
import Layout from "components/Layout"
import { MDXProps } from "mdx/types"

export interface PostProps extends FrontMatter, MDXProps {
  children: React.ReactNode
}

interface PostMetaProps {
  date: string
  tags: string[]
}

const fontSize = { base: "3xl", md: "4xl", lg: "5xl" }
const spacing = { base: 4, md: 5, lg: 6 }
const spacingDouble = { base: 8, md: 10, lg: 12 }
const marginTopTitle = { base: 14, lg: 20 }

const fontSizeSub = { md: "md", lg: "lg" }
const lineHeight = { md: "tall", lg: 1.75 }

const formatDate = (date: string) => format(parseISO(date), "PPP")

const PostMeta: React.FC<PostMetaProps> = ({ date, tags }) => (
  <>
    <Divider />
    <Flex mt={spacing} mb={spacingDouble} flexWrap="wrap">
      <Box color="gray.500" fontSize={fontSizeSub} lineHeight={lineHeight}>
        Published on {formatDate(date)}
      </Box>
      <Spacer />
      <Stack direction="row">
        {tags.map((tag) => (
          // eslint-disable-next-line react-hooks/rules-of-hooks
          <Tag key={tag} variant="subtle" colorScheme="brand" size={useBreakpointValue({ base: "md", lg: "lg" })}>
            {tag}
          </Tag>
        ))}
      </Stack>
    </Flex>
  </>
)

const Post: React.FC<PostProps> = ({ children, title, excerpt, date, tags }) => (
  <Layout title={title}>
    <Head>
      <meta name="description" key="description" content={excerpt} />
      <meta name="keywords" key="keywords" content={tags?.join(", ")} />
    </Head>
    <Container maxW="7xl" flex="1 0 auto" py={8} mt={marginTopTitle} as="article">
      <Heading as="h1" fontSize={fontSize} my={spacingDouble}>
        {title}
      </Heading>
      {date && <PostMeta date={date} tags={tags || []} />}
      {children}
    </Container>
  </Layout>
)

export default Post

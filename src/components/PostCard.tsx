import Image from "next/image"
import NextLink from "next/link"
import { Box, Heading, Spacer, Stack, Tag, Text, useColorModeValue } from "@chakra-ui/react"
import { Post } from "types"
import { format, parseISO } from "date-fns"

const defaultThumb =
  "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"

const reformatDate = (date: string) => format(parseISO(date), "PP")

const PostCard: React.FC<Post> = ({ frontMatter, slug, readingTime }) => (
  <NextLink href={`/blog/${slug}`} passHref>
    <Box
      maxW="445px"
      w="full"
      borderBottomWidth="5px"
      borderBottomColor={useColorModeValue("gray.100", "gray.800")}
      bg={useColorModeValue("white", "gray.900")}
      boxShadow="2xl"
      rounded="md"
      p={6}
      overflow="hidden"
      cursor="pointer"
      transition="transform 200ms ease-in-out"
      _hover={{
        transform: "translateY(-3px)",
        borderBottomColor: "brand.500",
        bg: useColorModeValue("gray.50", "gray.800"),
        boxShadow: "3xl",
      }}
    >
      <Box h="210px" bg="gray.100" mt={-6} mx={-6} mb={6} pos="relative">
        <Image src={frontMatter.thumb || defaultThumb} layout="fill" objectFit="cover" />
      </Box>
      <Stack h="calc(100% - 210px)">
        <Stack direction="row">
          {frontMatter.tags?.map((tag) => (
            <Tag key={tag} variant="subtle" colorScheme="brand">
              {tag}
            </Tag>
          ))}
        </Stack>
        <Heading color={useColorModeValue("gray.700", "white")} fontSize="2xl" fontFamily="body">
          {frontMatter.title}
        </Heading>
        <Text color="gray.500">{frontMatter.excerpt}</Text>
        <Spacer />
        <Text color="gray.500" fontSize="sm">
          {reformatDate(frontMatter.date || "")} · {readingTime.text}
        </Text>
      </Stack>
    </Box>
  </NextLink>
)

export default PostCard

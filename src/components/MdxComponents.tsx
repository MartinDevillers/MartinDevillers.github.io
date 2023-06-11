/* eslint-disable react/destructuring-assignment */
import {
  useColorModeValue,
  Heading,
  Center,
  Box,
  List,
  OrderedList,
  ListItem,
  ListIcon,
  Code,
  Text,
  Image,
  Link,
  SimpleGrid,
  LinkProps,
  HeadingProps,
  CenterProps,
  BoxProps,
  ListProps,
  ListItemProps,
  ImageProps,
  CodeProps,
  TextProps,
} from "@chakra-ui/react"
import { FaCaretRight, FaTrophy } from "react-icons/fa"
import { spacing, fontSize, lineHeight, spacingDouble, borderRadius, boxShadow } from "utils/theme"
import CodeBlock, { CodeBlockProps } from "./CodeBlock"
import Post, { PostProps } from "./Post"

export const MdxText: React.FC<TextProps> = (props) => (
  <Text
    color={useColorModeValue("gray.800", "gray.300")}
    mb={spacing}
    fontSize={fontSize}
    lineHeight={lineHeight}
    {...props}
  />
)
export const MdxLink: React.FC<LinkProps> = (props) => (
  <Link color={useColorModeValue("brand.600", "brand.100")} isExternal {...props} />
)
export const MdxHeading1: React.FC<HeadingProps> = (props) => (
  <Heading as="h2" size="lg" mb={spacing} mt={spacingDouble} {...props} />
)
export const MdxHeading2: React.FC<HeadingProps> = (props) => (
  <Heading as="h3" size="md" mb={spacing} mt={spacingDouble} {...props} />
)
export const MdxHeading3: React.FC<HeadingProps> = (props) => (
  <Heading as="h4" size="sm" mb={spacing} mt={spacingDouble} {...props} />
)
export const MdxCenterQuote: React.FC<CenterProps> = (props) => (
  <Center>
    <Text
      color={useColorModeValue("gray.800", "gray.300")}
      mb={spacing}
      fontSize={fontSize}
      lineHeight={lineHeight}
      textAlign="center"
      {...props}
    />
  </Center>
)
export const MdxBlockQuote: React.FC<BoxProps> = (props) => (
  <Box
    borderLeft="6px solid"
    pl={spacing}
    borderColor={useColorModeValue("brand.600", "brand.100")}
    opacity={0.8}
    fontStyle="italic"
    {...props}
  />
)
export const MdxUnorderedList: React.FC<ListProps> = (props) => <List mb={spacing} {...props} />
export const MdxOrderedList: React.FC<ListProps> = (props) => <OrderedList mb={spacing} {...props} />
export const MdxListItem: React.FC<ListItemProps> = (props) => (
  <ListItem fontSize={fontSize} lineHeight={lineHeight} {...props}>
    <ListIcon as={FaCaretRight} color="brand.500" />
    {props.children}
  </ListItem>
)
export const MdxListItemTrophy: React.FC<ListItemProps> = (props) => (
  <ListItem fontSize={fontSize} lineHeight={lineHeight} {...props}>
    <ListIcon as={FaTrophy} color="brand.500" />
    {props.children}
  </ListItem>
)
export const MdxImage: React.FC<ImageProps> = (props) => (
  <Image borderRadius={borderRadius} boxShadow={boxShadow} {...props} />
)
export const MdxCodeBlock: React.FC<CodeBlockProps> = (props) => <CodeBlock {...props} />
export const MdxInlineCode: React.FC<CodeProps> = (props) => (
  <Code fontSize={fontSize} lineHeight={lineHeight} wordBreak="break-all" {...props} />
)
export const MdxLayout: React.FC<PostProps> = ({ components, ...rest }) => <Post {...rest} />

const mdxComponents = {
  p: MdxText,
  a: MdxLink,
  h1: MdxHeading1,
  h2: MdxHeading2,
  h3: MdxHeading3,
  h4: MdxCenterQuote,
  blockquote: MdxBlockQuote,
  ul: MdxUnorderedList,
  ol: MdxOrderedList,
  li: MdxListItem,
  img: MdxImage,
  pre: MdxCodeBlock,
  code: MdxInlineCode,
  wrapper: MdxLayout,
  SimpleGrid,
}

export default mdxComponents

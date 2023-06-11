import { SiTypescript, SiDotnet, SiReact } from "react-icons/si"
import { VscCode, VscJson, VscTerminal } from "react-icons/vsc"
import { FaJava } from "react-icons/fa"
import { Box, Flex, Icon, Spacer, Text, useColorModeValue } from "@chakra-ui/react"
import Highlight, { defaultProps } from "prism-react-renderer"
import theme from "prism-react-renderer/themes/nightOwl"
import Prism from "prism-react-renderer/prism"
import { spacing } from "utils/theme"

if (typeof global !== "undefined") {
  global.Prism = Prism
} else {
  window.Prism = Prism
}

require("prismjs/components/prism-csharp")
require("prismjs/components/prism-java")

export interface CodeBlockProps {
  children: React.ReactElement
}

const getIconForLanguage = (language: string) => {
  switch (language) {
    case "typescript":
      return SiTypescript
    case "csharp":
      return SiDotnet
    case "java":
      return FaJava
    case "json":
      return VscJson
    case "xml":
      return VscCode
    case "tsx":
    case "jsx":
      return SiReact
    case "terminal":
    case "bash":
    case "console":
      return VscTerminal
    default:
      return VscCode
  }
}

const CodeBlock: React.FC<CodeBlockProps> = ({ children }) => {
  const bgColor = useColorModeValue("brand.50", "brand.800")
  const fgColor = useColorModeValue("brand.700", "brand.100")
  const code = children?.props?.children
  const language = children?.props?.className?.replace("language-", "").trim()
  const { title } = children?.props || ""
  return (
    <Box mx={-4} mb={spacing}>
      <Highlight {...defaultProps} code={code} theme={theme} language={language}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <>
            <Flex px={4} py={2} bg={bgColor} color={fgColor}>
              <Text as="pre" isTruncated>
                {title}
              </Text>
              <Spacer />
              {language && <Icon as={getIconForLanguage(language)} boxSize={6} />}
            </Flex>
            <Box as="pre" pb={4} overflow="auto" className={className} style={{ ...style }}>
              {tokens.slice(0, -1).map((line, i) => (
                <Box mx={4} display="table-row" {...getLineProps({ line, key: i })}>
                  <Box
                    as="span"
                    display="inline-block"
                    textAlign="right"
                    width={12}
                    pr={6}
                    userSelect="none"
                    opacity={0.3}
                  >
                    {i + 1}
                  </Box>
                  {line.map((token, key) => (
                    <Box as="span" display="inline-block" {...getTokenProps({ token, key })} />
                  ))}
                </Box>
              ))}
            </Box>
          </>
        )}
      </Highlight>
    </Box>
  )
}

export default CodeBlock

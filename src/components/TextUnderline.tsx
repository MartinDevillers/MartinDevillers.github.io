import { ReactNode } from "react"
import { Box, useColorModeValue } from "@chakra-ui/react"

interface TextUnderlineProps {
  children: ReactNode
}

const TextUnderline: React.FC<TextUnderlineProps> = ({ children }) => (
  <Box
    as="span"
    color={useColorModeValue("brand.600", "brand.200")}
    position="relative"
    zIndex={10}
    _after={{
      content: '""',
      position: "absolute",
      left: 0,
      bottom: 0,
      w: "full",
      h: "30%",
      bg: useColorModeValue("brand.100", "brand.700"),
      zIndex: -1,
    }}
  >
    {children}
  </Box>
)

export default TextUnderline

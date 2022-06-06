import { Container } from "@chakra-ui/react"
import React from "react"

const marginTop = { base: 14, lg: 20 }

const PageContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Container maxW="7xl" flex="1 0 auto" py={8} mt={marginTop}>
    {children}
  </Container>
)

export default PageContainer

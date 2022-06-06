import { Grid, Flex, Box } from "@chakra-ui/react"
import Image from "next/image"
import logoReact from "../../public/assets/logo-react.svg"
import logoGraphQL from "../../public/assets/logo-graphql.svg"
import logoTypeScript from "../../public/assets/logo-typescript.svg"
import logoApollo from "../../public/assets/logo-apollo.svg"

const HomeTechs: React.FC = () => (
  <Grid templateColumns={["repeat(2, minmax(0, 1fr))", "repeat(4, minmax(0, 1fr))"]}>
    <a href="https://reactjs.org" target="_blank" rel="noreferrer">
      <Flex
        style={{ aspectRatio: "1" }}
        bgColor="#20232a"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
      >
        <Box w="50%">
          <Image src={logoReact} layout="responsive" />
        </Box>
      </Flex>
    </a>
    <a href="https://graphql.org" target="_blank" rel="noreferrer">
      <Flex style={{ aspectRatio: "1" }} justifyContent="center" alignItems="center" textAlign="center">
        <Box w="50%">
          <Image src={logoGraphQL} layout="responsive" />
        </Box>
      </Flex>
    </a>
    <a href="https://www.typescriptlang.org" target="_blank" rel="noreferrer">
      <Flex style={{ aspectRatio: "1" }} bgColor="#3178c6" justifyContent="right" alignItems="end" textAlign="center">
        <Box w="75%">
          <Image src={logoTypeScript} layout="responsive" />
        </Box>
      </Flex>
    </a>
    <a href="https://www.apollographql.com" target="_blank" rel="noreferrer">
      <Flex
        style={{ aspectRatio: "1" }}
        bgColor="#311c87"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
      >
        <Box w="50%">
          <Image src={logoApollo} layout="responsive" />
        </Box>
      </Flex>
    </a>
  </Grid>
)

export default HomeTechs

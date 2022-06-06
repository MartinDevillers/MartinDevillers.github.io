import { Grid, Flex, Box } from "@chakra-ui/react"
import Image from "next/image"
import logoTmobile from "../../public/assets/logo-tmobile.svg"
import logoApple from "../../public/assets/logo-apple.svg"
import logoBestBuy from "../../public/assets/logo-bestbuy.svg"
import logoSamsung from "../../public/assets/logo-samsung2.svg"

const HomeClient: React.FC = () => (
  <Grid templateColumns={["repeat(2, minmax(0, 1fr))", "repeat(4, minmax(0, 1fr))"]}>
    <a href="https://www.t-mobile.com" target="_blank" rel="noreferrer">
      <Flex
        style={{ aspectRatio: "1" }}
        bgColor="#e20074"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
      >
        <Box w="50%">
          <Image src={logoTmobile} layout="responsive" />
        </Box>
      </Flex>
    </a>
    <a href="https://www.apple.com" target="_blank" rel="noreferrer">
      <Flex style={{ aspectRatio: "1" }} justifyContent="center" alignItems="center" textAlign="center" bgColor="black">
        <Box w="40%">
          <Image src={logoApple} layout="responsive" style={{ filter: "invert(1)" }} />
        </Box>
      </Flex>
    </a>
    <a href="https://www.bestbuy.com" target="_blank" rel="noreferrer">
      <Flex
        style={{ aspectRatio: "1" }}
        bgColor="#0046be"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
      >
        <Box w="50%">
          <Image src={logoBestBuy} layout="responsive" />
        </Box>
      </Flex>
    </a>
    <a href="https://www.samsung.com" target="_blank" rel="noreferrer">
      <Flex style={{ aspectRatio: "1" }} bgColor="white" justifyContent="center" alignItems="center" textAlign="center">
        <Box w="60%">
          <Image src={logoSamsung} layout="responsive" />
        </Box>
      </Flex>
    </a>
  </Grid>
)

export default HomeClient

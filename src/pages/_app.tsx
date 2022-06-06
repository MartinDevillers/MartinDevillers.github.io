import "@fontsource/noto-serif/700.css"
import "@fontsource/roboto"

import type { AppProps } from "next/app"
import { ChakraProvider } from "@chakra-ui/react"
import { MDXProvider } from "@mdx-js/react"
import theme from "utils/theme"
import mdxComponents from "components/MdxComponents"
import { MDXComponents } from "mdx/types"

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider theme={theme}>
      <MDXProvider components={mdxComponents as MDXComponents}>
        <Component {...pageProps} />
      </MDXProvider>
    </ChakraProvider>
  )
}

export default MyApp

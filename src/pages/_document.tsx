import { ColorModeScript } from "@chakra-ui/react"
import Favicon from "components/Favicon"
import NextDocument, { Html, Head, Main, NextScript } from "next/document"
import theme from "utils/theme"

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <Head>
          <Favicon />
        </Head>
        <body>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

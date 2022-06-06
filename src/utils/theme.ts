import { extendTheme } from "@chakra-ui/react"

const theme = extendTheme({
  colors: {
    brand: {
      50: "#fce9ff",
      100: "#e9c1f2",
      200: "#d79ae6",
      300: "#c672da",
      400: "#b64ace",
      500: "#9c31b5",
      600: "#7a258d",
      700: "#571966",
      800: "#350e3f",
      900: "#150219",
    },
  },
  fonts: {
    heading: "Noto Serif, serif",
    body: "Roboto, sans-serif",
  },
})

export default theme

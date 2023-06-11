import { extendTheme } from "@chakra-ui/react"

export const fontSize = { md: "lg", lg: "xl" }
export const fontSizeHeading = { base: "3xl", md: "4xl", lg: "5xl" }
export const lineHeight = { md: "tall", lg: 1.75 }
export const spacing = { base: 4, md: 5, lg: 6 }
export const spacingDouble = { base: 8, md: 10, lg: 12 }
export const borderRadius = { base: "base", md: "md", lg: "lg" }
export const boxShadow = { base: "base", md: "md", lg: "lg" }

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
